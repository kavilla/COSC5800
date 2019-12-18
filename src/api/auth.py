from flask import Flask, request
from flask_restplus import Api, Resource, fields

from config import db
from models import NotFoundException, CollisionException

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace('auth', description='Auth operations')

login_model = ns.model('Auth Login', {
    'email': fields.String(required=True, description='Email', help='Email is required.'),
    'password': fields.String(required=True, description='Password', help='Password is required.'),
})

signup_model = ns.model('Auth SignUp', {
    'email': fields.String(required=True, description='Email', help='Email is required.'),
    'password': fields.String(description='Password'),
    'firstname': fields.String(required=True, description='First Name', help='First name is required.'),
    'minit': fields.String(description='Middle Initial'),
    'lastname': fields.String(required=True, description='Last Name', help='Last name is required.'),
    'phone': fields.String(description='Phone'),
    'affiliation': fields.String(description='affiliation'),
    'isAuthor': fields.Boolean(required=True, description='Is Author', help='Is Author is required.'),
    'isReviewer': fields.Boolean(required=True, description='Is Reviewer', help='Is Reviewer is required.')
})


@ns.route("/login")
class AuthLogin(Resource):
    @ns.expect(login_model)
    @ns.doc(responses={
        200: 'Success',
        400: 'Invalid Request',
        404: 'Not found'
    })
    def post(self):
        """
        Returns a participator if valid
        """
        try:
            password_exists_query = 'SELECT * FROM participator WHERE email = :email AND password = :password'
            password_is_null_query = 'SELECT * FROM participator WHERE email = :email AND password IS NULL'
            author_query = 'SELECT * FROM author WHERE email = :email'
            reviewer_query = 'SELECT * FROM reviewer WHERE email = :email'

            data = request.get_json(force=True)

            query = password_exists_query if data['password'] != None else password_is_null_query
            result = db.session.execute(query, {
                'email': data['email'],
                'password': data['password']
            }).fetchone()

            if result == None:
                raise NotFoundException

            author_result = db.session.execute(author_query, {
                'email': data['email']
            }).fetchone()

            reviewer_result = db.session.execute(reviewer_query, {
                'email': data['email']
            }).fetchone()

            return {
                'email': result['email'],
                'firstname': result['firstname'],
                'minit': result['minit'],
                'lastname': result['lastname'],
                'phone': result['phone'],
                'affiliation': result['affiliation'],
                'password': result['password'],
                'isAuthor': author_result != None,
                'isReviewer': reviewer_result != None
            }
        except NotFoundException as e:
            app.logger.error(e)
            ns.abort(404, e.__doc__, status='Could not find participator with email and password', statusCode='404')
        except Exception as e:
            app.logger.error(e)
            ns.abort(400, e.__doc__, status='Could not retrieve information', statusCode='400')


@ns.route("/signup")
class AuthSignUp(Resource):
    @ns.expect(signup_model)
    @ns.doc(responses={
        200: 'Success',
        400: 'Invalid Request'
    })
    def post(self):
        """
        Create and returns a participator if valid
        """
        try:
            participator_query = 'SELECT * FROM participator WHERE email = :email'
            insert_participator_query = 'INSERT INTO participator VALUES ( :email, :firstname, :minit, :lastname, :phone, :affiliation, :password )'
            insert_author_query = 'INSERT INTO author VALUES ( :email )'
            insert_reviewer_query = 'INSERT INTO reviewer VALUES ( :email )'
            commit_query = 'COMMIT'
            password_exists_query = 'SELECT * FROM participator WHERE email = :email AND password = :password'
            password_is_null_query = 'SELECT * FROM participator WHERE email = :email AND password IS NULL'
            author_query = 'SELECT * FROM author WHERE email = :email'
            reviewer_query = 'SELECT * FROM reviewer WHERE email = :email'

            data = request.get_json(force=True)

            participator_result = db.session.execute(participator_query, {
                'email': data['email'],
            }).fetchone()

            if participator_result != None:
                raise CollisionException

            db.session.execute(insert_participator_query, {
                'email': data['email'],
                'firstname': data['firstname'],
                'minit': data['minit'],
                'lastname': data['lastname'],
                'phone': data['phone'],
                'affiliation': data['affiliation'],
                'password': data['password']
            })

            if data['isAuthor'] != None and data['isAuthor']:
                db.session.execute(insert_author_query, {
                    'email': data['email']
                })

            if data['isReviewer'] != None and data['isReviewer']:
                db.session.execute(insert_reviewer_query, {
                    'email': data['email']
                })

            db.session.execute(commit_query)

            query = password_exists_query if data['password'] != None else password_is_null_query
            result = db.session.execute(query, {
                'email': data['email'],
                'password': data['password']
            }).fetchone()

            author_result = db.session.execute(author_query, {
                'email': data['email']
            }).fetchone()

            reviewer_result = db.session.execute(reviewer_query, {
                'email': data['email']
            }).fetchone()

            return {
                'email': result['email'],
                'firstname': result['firstname'],
                'minit': result['minit'],
                'lastname': result['lastname'],
                'phone': result['phone'],
                'affiliation': result['affiliation'],
                'password': result['password'],
                'isAuthor': author_result != None,
                'isReviewer': reviewer_result != None
            }
        except CollisionException as e:
            ns.abort(400, e.__doc__, status='Email already exists', statusCode='400')
        except Exception as e:
            app.logger.error(e)
            ns.abort(400, e.__doc__, status='Could not retrieve information', statusCode='400')
