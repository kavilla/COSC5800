from flask import Flask
from flask_restplus import Api, Resource
from config import db
from models import Participator as P, ParticipatorSchema

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace('participators', description='Participators operations')

@ns.route("/")
class ParticipatorList(Resource):
    def get(self):
        """
        Returns a list of participators
        """
        participators = P.query.all()

        # Serialize the data for the response
        participators_schema = ParticipatorSchema(many=True)
        return participators_schema.dump(participators)
    def post(self):
        """
        Adds a new participators to the list
        """

@ns.route("/<int:id>")
class Participator(Resource):
    def get(self, id):
        """
        Displays a participator's details
        """
    def put(self, id):
        """
        Edits a selected participators
        """
