from flask import Flask
from flask_restplus import Api
from participator import ns as ns_participator

api = Api(
    title='Conference API',
    version='1.0',
    description='API for CS5800'
)

api.add_namespace(ns_participator)

app = Flask(__name__)

api.init_app(app)
app.run(debug=True)
