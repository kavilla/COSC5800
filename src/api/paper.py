from flask import Flask, request
from flask_restplus import Api, Resource, fields

from config import db
from models import PaperSchema, ReviewSchema, NotFoundException, NotAuthorizedException

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
    @ns.doc(responses={
        200: 'Success'
    })
    def get(self):
        """
        Returns a list of papers
        """
        paper_query = 'SELECT * FROM paper'

        result = db.session.execute(paper_query).fetchmany()

        papers_schema = PaperSchema(many=True)
        return papers_schema.dump(result)

    @ns.expect(paper_model)
    @ns.doc(responses={
        200: 'Success',
        401: 'Unauthorized',
        400: 'Invalid Parameters'
    })
    def post(self):
        """
        Creates a new paper and returns updated list of papers
        """
        try:
            author_query = 'SELECT * FROM author WHERE email = :email'
            insert_paper_query = 'INSERT INTO paper VALUES (Paper_paperid_Seq.nextval, :title, :filename, :contactauthoremail, :abstract)'
            commit_query = 'COMMIT'

            data = request.get_json(force=True)

            author_result = db.session.execute(author_query, {
                'email': data['contactauthoremail']
            }).fetchone()

            if author_result == None:
                raise NotAuthorizedException

            db.session.execute(insert_paper_query, {
                'title': data['title'],
                'filename': data['filename'],
                'contactauthoremail': data['contactauthoremail'],
                'abstract': data['abstract']
            })

            db.session.execute(commit_query)

            return self.get()
        except NotAuthorizedException as e:
            ns.abort(401, e.__doc__, status='Not allowed to create review', statusCode='401')
        except Exception as e:
            app.logger.error(e)
            ns.abort(400, e.__doc__, status='Could not retrieve information', statusCode='400')


@ns.route('/<int:paperid>')
class Paper(Resource):
    @ns.doc(responses={
        200: 'Success',
        404: 'Not Found'
    })
    def get(self, paperid):
        """
        Returns a paper if it exists
        """
        try:
            paper_query = 'SELECT * FROM paper WHERE paperid = :paperid'

            result = db.session.execute(paper_query, {
                'paperid': paperid
            }).fetchone()

            if result == None:
                raise NotFoundException

            paper_schema = PaperSchema()
            return paper_schema.dump(result)
        except NotFoundException as e:
            ns.abort(404, e.__doc__, status='Could not find paper with paperid', statusCode='404')


@ns.route("/<string:email>")
class ParticipatorPapers(Resource):
    @ns.doc(responses={
        200: 'Success',
        404: 'Could not find papers for email'
    })
    def get(self, email):
        """
        Returns a list of papers authored/coauthored by participator
        """
        try:
            paper_query = 'SELECT * FROM paper writes WHERE paperid IN (SELECT paperid FROM writes WHERE email = :email)'

            result = db.session.execute(paper_query, {
                'email': email
            }).fetchmany()

            if result == None:
                raise NotFoundException

            papers_schema = PaperSchema(many=True)
            return papers_schema.dump(result)
        except NotFoundException as e:
            ns.abort(404, e.__doc__, status='Could not find papers for email', statusCode='404')


@ns.route('/<int:paperid>/reviews')
class PaperReviews(Resource):
    @ns.doc(responses={
        200: 'Success',
        404: 'Could not find reviews for paper'
    })
    def get(self, paperid):
        """
        Returns a list of reviews for paper
        """
        try:
            review_query = 'SELECT * FROM reviews WHERE paperid = :paperid'

            result = db.session.execute(review_query, {
                'paperid': paperid
            }).fetchmany()

            if result == None:
                raise NotFoundException

            reviews_schema = ReviewSchema(many=True)
            return reviews_schema.dump(result)
        except NotFoundException as e:
            ns.abort(404, e.__doc__, status='Could not find paper with paperid', statusCode='404')
