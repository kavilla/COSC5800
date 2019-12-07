from flask import Flask
from flask_restplus import Api, Resource
from config import db
from models import Paper as P, PaperSchema, ReviewSchema, NotFoundException

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace('papers', description='Papers operations')

@ns.route("/")
class PaperList(Resource):
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
