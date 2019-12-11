from flask import Flask, request
from flask_restplus import Api, Resource, fields
from config import db
from models import Paper as P, PaperSchema, ReviewSchema, NotFoundException, NotAuthorizedException

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace('papers', description='Papers operations')

paper_model = ns.model('Paper', {
    'title': fields.Integer(required=True, description='Title', help='Title is required.'),
    'filename': fields.Integer(required=True, description='Filename', help='Name of file is required.'),
    'contactauthoremail': fields.String(required=True, description='Email', help='Email is required.'),
    'abstract': fields.String(description='abstract')
})

@ns.route("/")
class Papers(Resource):
    def get(self):
        """
        Returns a list of paper
        """
        papers = P.query.all()

        # Serialize the data for the response
        papers_schema = PaperSchema(many=True)
        return papers_schema.dump(papers)

    @ns.expect(paper_model)
    @ns.doc(responses={
        200: 'Success',
        401: 'Unauthorized',
        400: 'Invalid Parameters'
    })
    def post(self):
        """
        Adds a new paper to the list
        """
        try:
            data = request.get_json(force=True)

            authorResult = db.session.execute('SELECT * FROM author WHERE email = :email', {
                'email': data['contactauthoremail']
            }).fetchone()

            if authorResult == None:
                raise UnauthorizedException

            # Serialize the data for the response
            db.session.execute('INSERT INTO paper VALUES (Paper_paperid_Seq.nextval, :title, :filename, :contactauthoremail, :abstract)', {
                'title': data['title'],
                'filename': data['filename'],
                'contactauthoremail': data['contactauthoremail'],
                'abstract': data['abstract']
            })

            db.session.execute('COMMIT')

            result = db.session.execute('SELECT * FROM paper').fetchmany()
            papers_schema = PaperSchema(many=True)
            return papers_schema.dump(result)
        except NotAuthorizedException as e:
            ns.abort(401, e.__doc__, status = 'Not allowed to POST review', statusCode = '401')

@ns.route('/<int:paperid>')
class Paper(Resource):
    def get(self, paperid):
        """
        Displays a paper's details
        """
        try:
            # Serialize the data for the response
            result = db.session.execute('SELECT * FROM paper WHERE paperid = :paperid', {
                'paperid': paperid
            }).fetchone()
            if result == None:
                raise NotFoundException
            paper_schema = PaperSchema()
            return paper_schema.dump(result)
        except NotFoundException as e:
            ns.abort(404, e.__doc__, status = 'Could not find paper with paperid', statusCode = '404')
    def put(self, paperid):
        """
        Edits a selected paper
        """

@ns.route("/<string:email>")
@ns.doc(responses={
    200: 'Success',
    404: 'Could not find papers for email'
})
class ParticipatorPapers(Resource):
    def get(self, email):
        """
        Displays a papers authored/coauthored by participator
        """
        # paperid = db.Column(db.Integer(), primary_key=True)
        # title = db.Column(db.String(50), nullable=False)
        # filename = db.Column(db.String(30), nullable=False)
        # contactauthoremail = db.Column(db.String(30))
        # abstract = db.Column(db.String(120))
        try:
            # Serialize the data for the response
            papers = db.session.execute('SELECT * FROM paper writes WHERE paperid IN (SELECT paperid FROM writes WHERE email = :email)', {
                'email': email
            }).fetchmany()
            if papers == None:
                raise NotFoundException
            papers_schema = PaperSchema(many=True)
            return papers_schema.dump(papers)
        except NotFoundException as e:
            ns.abort(404, e.__doc__, status = 'Could not find papers for email', statusCode = '404')

@ns.route('/<int:paperid>/reviews')
class PaperReviews(Resource):
    def get(self, paperid):
        """
        Displays a paper's reviews
        """
        try:
            # Serialize the data for the response
            reviews = db.session.execute('SELECT * FROM reviews WHERE paperid = :paperid', {
                'paperid': paperid
            }).fetchmany()
            if reviews == None:
                raise NotFoundException
            reviews_schema = ReviewSchema(many=True)
            return reviews_schema.dump(reviews)
        except NotFoundException as e:
            ns.abort(404, e.__doc__, status = 'Could not find paper with paperid', statusCode = '404')
