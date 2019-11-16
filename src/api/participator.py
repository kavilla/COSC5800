from flask import Flask
from flask_restplus import Api, Resource

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace('participators', description='Participators operations')

@ns.route("/")
class ParticipatorList(Resource):
    def get(self):
        """
        Returns a list of participators
        """
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
