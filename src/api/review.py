from flask import Flask, request
from flask_restplus import Api, Resource, fields

from config import db
from models import Review as R, ReviewSchema, NotFoundException, NotAuthorizedException, CollisionException

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace('reviews', description='Reviews operations')

review_model = ns.model('Review', {
    'revemail': fields.String(required=True, description='Email', help='Email is required.'),
    'paperid': fields.Integer(required=True, description='PaperId', help='PaperID is required.'),
    'techmerit': fields.Integer(required=True, description='Tech Merit', help='Tech merit is required.'),
    'readability': fields.Integer(required=True, description='Readability', help='Readability is required.'),
    'originality': fields.Integer(required=True, description='Originality', help='Originality is required.'),
    'relavance': fields.Integer(required=True, description='Relavance', help='Relavance is required.'),
    'overallrecomm': fields.Integer(required=True, description='Overall Recommendation',
                                    help='Overall recommendation is required.'),
    'commentforcommittee': fields.String(description='commentforcommittee'),
    'commentforauthor': fields.String(description='commentforauthor')
})


@ns.route("/")
class Reviews(Resource):
    def get(self):
        """
        Returns a list of review
        """
        reviews = R.query.all()

        # Serialize the data for the response
        reviews_schema = ReviewSchema(many=True)
        return reviews_schema.dump(reviews)

    @ns.expect(review_model)
    @ns.doc(responses={
        200: 'Success',
        401: 'Unauthorized',
        400: 'Invalid Parameters'
    })
    def post(self):
        """
        Adds a new review to the list
        """
        try:
            data = request.get_json(force=True)

            reviewerResult = db.session.execute('SELECT * FROM reviewer WHERE email = :email', {
                'email': data['revemail']
            }).fetchone()

            if reviewerResult == None:
                raise NotAuthorizedException

            reviewResult = db.session.execute('SELECT * FROM reviews WHERE revemail = :revemail AND paperid = :paperid',
                                              {
                                                  'revemail': data['revemail'],
                                                  'paperid': data['paperid']
                                              }).fetchone()

            if reviewResult != None:
                raise CollisionException

            # Serialize the data for the response
            db.session.execute(
                'INSERT INTO reviews VALUES (:revemail, :paperid, :techmerit, :readability, :originality, :relavance, :overallrecomm, :commentforcommittee, :commentforauthor)',
                {
                    'revemail': data['revemail'],
                    'paperid': data['paperid'],
                    'techmerit': data['techmerit'],
                    'readability': data['readability'],
                    'originality': data['originality'],
                    'relavance': data['relavance'],
                    'overallrecomm': data['overallrecomm'],
                    'commentforcommittee': data['commentforcommittee'],
                    'commentforauthor': data['commentforauthor']
                })

            db.session.execute('COMMIT')

            result = db.session.execute('SELECT * FROM reviews WHERE paperid = :paperid', {
                'paperid': data['paperid']
            }).fetchmany()
            reviews_schema = ReviewSchema(many=True)
            return reviews_schema.dump(result)
        except CollisionException as e:
            ns.abort(400, e.__doc__, status='Review for paper already exists for email', statusCode='400')
        except NotAuthorizedException as e:
            ns.abort(401, e.__doc__, status='Not allowed to POST review', statusCode='401')


@ns.route('/<string:revemail>')
class ParticipatorReviews(Resource):
    def get(self, revemail):
        """
        Returns a list of reviews for participator
        """
        try:
            # Serialize the data for the response
            result = db.session.execute('SELECT * FROM reviews WHERE revemail = :revemail', {
                'revemail': revemail
            }).fetchmany()
            if result == None:
                raise NotFoundException
            reviews_schema = ReviewSchema(many=True)
            return reviews_schema.dump(result)
        except NotFoundException as e:
            ns.abort(404, e.__doc__, status='Could not find reviews for email', statusCode='404')


@ns.route('/<string:revemail>&<int:paperid>')
class Review(Resource):
    def get(self, revemail, paperid):
        """
        Displays a review's details
        """
        try:
            # Serialize the data for the response
            result = db.session.execute('SELECT * FROM paper WHERE revemail = :revemail AND paperid = :paperid', {
                'revemail': revemail,
                'paperid': paperid
            }).fetchone()
            if result == None:
                raise NotFoundException
            review_schema = ReviewSchema()
            return review_schema.dump(result)
        except NotFoundException as e:
            ns.abort(404, e.__doc__, status='Could not find review with email and paperid', statusCode='404')

    def put(self, revemail, paperid):
        """
        Edits a selected review
        """
