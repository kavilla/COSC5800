from flask import Flask
from flask_restplus import Api, Resource
from config import db
from models import Paper as P, PaperSchema, ReviewSchema, NotFoundException

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace('papers', description='Papers operations')

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
    def post(self):
        """
        Adds a new paper to the list
        """

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
