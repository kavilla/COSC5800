from flask import Flask, request
from flask_restplus import Api, Resource, fields
from config import db
from models import Participator as P, ParticipatorSchema

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace('auth', description='Auth operations')

auth_model = ns.model('Credentials', {
    'email': fields.String(required=True, description='Email', help='Email is required.'),
    'password': fields.String(required=True, description='Password', help='Password is required.'),
})

@ns.route("/login")
class AuthLogin(Resource):
    @ns.expect(auth_model)
    @ns.doc(responses={
        200: 'Success',
        400: 'Invalid Request'
    })
    def post(self):
        """
        Returns a participator if valid
        """
        try:
            data = request.get_json(force=True)

            # Serialize the data for the response
            result = db.session.execute('SELECT * FROM participator WHERE email = :email AND password = :password', {
                'email': data['email'],
                'password': data['password']
            }).fetchone()
            participator_schema = ParticipatorSchema()
            return participator_schema.dump(result)
        except Exception as e:
            ns.abort(400, e.__doc__, status = 'Could not retrieve information', statusCode = '400')
