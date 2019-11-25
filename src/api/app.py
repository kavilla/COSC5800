from config import api, app
from participator import ns as ns_participator

api.add_namespace(ns_participator)

# Initialize API
api.init_app(app)

app.run(debug=True)
