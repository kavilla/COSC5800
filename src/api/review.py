from flask import Flask, request
from flask_restplus import Api, Resource, fields

from app import db
from models import ReviewSchema, NotFoundException, NotAuthorizedException, CollisionException

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
    'overallrecomm': fields.Integer(required=True, description='Overall Recommendation', help='Overall recommendation is required.'),
    'commentforcommittee': fields.String(description='Comment for committee'),
    'commentforauthor': fields.String(description='Comment for author')
})


@ns.route("/")
class Reviews(Resource):
    @ns.doc(responses={
        200: 'Success'
    })
    def get(self):
        """
        Returns a list of reviews
        """
        review_query = 'SELECT * FROM reviews'

        result = db.session.execute(review_query).fetchmany()

        reviews_schema = ReviewSchema(many=True)
        return reviews_schema.dump(result)

    @ns.expect(review_model)
    @ns.doc(responses={
        200: 'Success',
        401: 'Unauthorized',
        400: 'Invalid Parameters'
    })
    def post(self):
        """
        Creates a new review and returns an updated list of reviews for paper
        """
        try:
            reviewer_query = 'SELECT * FROM reviewer WHERE email = :email'
            review_query = 'SELECT * FROM reviews WHERE revemail = :revemail AND paperid = :paperid'
            insert_review_query = '''
                INSERT INTO reviews 
                VALUES (:revemail, :paperid, :techmerit, :readability, :originality, :relavance, :overallrecomm, :commentforcommittee, :commentforauthor)
            '''
            commit_query = 'COMMIT'

            data = request.get_json(force=True)

            reviewer_result = db.session.execute(reviewer_query, {
                'email': data['revemail']
            }).fetchone()

            if reviewer_result == None:
                raise NotAuthorizedException

            review_result = db.session.execute(review_query, {
                'revemail': data['revemail'],
                'paperid': data['paperid']
            }).fetchone()

            if review_result != None:
                raise CollisionException

            db.session.execute(insert_review_query, {
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

            db.session.execute(commit_query)

            return PaperReviews.get(self, data['paperid'])
        except CollisionException as e:
            ns.abort(400, e.__doc__, status='Review for paper already exists for email', statusCode='400')
        except NotAuthorizedException as e:
            ns.abort(401, e.__doc__, status='Not allowed to create review', statusCode='401')


@ns.route("/<int:paperid>")
class PaperReviews(Resource):
    @ns.doc(responses={
        200: 'Success',
        404: 'Not Found'
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
            ns.abort(404, e.__doc__, status='Could not find reviews for paper', statusCode='404')


@ns.route('/<string:revemail>')
class ParticipatorReviews(Resource):
    @ns.doc(responses={
        200: 'Success',
        404: 'Not Found'
    })
    def get(self, revemail):
        """
        Returns a list of reviews for participator
        """
        try:
            review_query = 'SELECT * FROM reviews WHERE revemail = :revemail'

            result = db.session.execute(review_query, {
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
    @ns.doc(responses={
        200: 'Success',
        404: 'Not Found'
    })
    def get(self, revemail, paperid):
        """
        Returns a review if it exists
        """
        try:
            review_query = 'SELECT * FROM paper WHERE revemail = :revemail AND paperid = :paperid'

            result = db.session.execute(review_query, {
                'revemail': revemail,
                'paperid': paperid
            }).fetchone()

            if result == None:
                raise NotFoundException

            review_schema = ReviewSchema()
            return review_schema.dump(result)
        except NotFoundException as e:
            ns.abort(404, e.__doc__, status='Could not find review for email and paper', statusCode='404')
