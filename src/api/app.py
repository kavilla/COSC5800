from auth import ns as ns_auth
from config import api, app
from paper import ns as ns_paper
from participator import ns as ns_participator
from review import ns as ns_review

api.add_namespace(ns_auth)
api.add_namespace(ns_paper)
api.add_namespace(ns_participator)
api.add_namespace(ns_review)

# Initialize API
api.init_app(app)

app.run(debug=True)
