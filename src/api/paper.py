from flask import Flask
from flask_restplus import Api, Resource
from config import db
from models import Paper, PaperSchema

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace('papers', description='Papers operations')

@ns.route("/")
class PaperList(Resource):
    def get(self):
        """
        Returns a list of paper
        """
        papers = Paper.query.all()

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
        Displays a participator's details
        """
    def put(self, paperid):
        """
        Edits a selected participators
        """
