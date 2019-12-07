from flask import Flask
from flask_restplus import Api, Resource
from config import db
from models import Review as R, ReviewSchema, NotFoundException

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace('reviews', description='Reviews operations')

@ns.route("/")
class ReviewList(Resource):
    def get(self):
        """
        Returns a list of review
        """
        reviews = R.query.all()

        # Serialize the data for the response
        reviews_schema = ReviewSchema(many=True)
        return reviews_schema.dump(reviews)
    def post(self):
        """
        Adds a new review to the list
        """

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
            ns.abort(404, e.__doc__, status = 'Could not find review with email and paperid', statusCode = '404')
    def put(self, revemail, paperid):
        """
        Edits a selected review
        """
