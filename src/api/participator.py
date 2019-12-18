from flask import Flask
from flask_restplus import Api, Resource

from app import db
from models import ParticipatorSchema

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace('participators', description='Participators operations')


@ns.route("/")
class ParticipatorList(Resource):
    @ns.doc(responses={
        200: 'Success'
    })
    def get(self):
        """
        Returns a list of participators
        """
        participator_query = 'SELECT * FROM participator'

        result = db.session.execute(participator_query).fetchmany()
        participators_schema = ParticipatorSchema(many=True)
        return participators_schema.dump(result)
