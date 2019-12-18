from flask import Flask
from flask_restplus import Api
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

config = {
    'db_username':  'avilla',
    'db_password': '005711442',
    'db_host': 'dataserv.mscsnet.mu.edu',
    'db_port': '1521',
    'db_sid': 'orcl'
}

api = Api(
    title='Conference API',
    version='1.0',
    description='API for CS5800'
)

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'oracle+cx_oracle://%s:%s@%s:%s/%s' % (config['db_username'], config['db_password'], config['db_host'], config['db_port'], config['db_sid'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

cors = CORS(app, resources={r"*": {"origins": "*"}})

# Create the SqlAlchemy db instance
db = SQLAlchemy(app)

# Initialize Marshmallow
ma = Marshmallow(app)
