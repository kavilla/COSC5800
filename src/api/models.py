from config import db, ma

class Participator(db.Model):
    __tablename__ = 'participator'
    email = db.Column(db.String(30), primary_key=True)
    firstname = db.Column(db.String(25))
    minit = db.Column(db.String(1))
    lastname = db.Column(db.String(25))
    phone = db.Column(db.String(10))
    affiliation = db.Column(db.String(25))
    password = db.Column(db.String(15))

    def __init__(self, email, firstname, minit, lastname, phone, affiliation, password):
        self.email = email
        self.firstname = firstname
        self.minit = minit
        self.lastname = lastname
        self.phone = phone
        self.affiliation = affiliation
        self.password = password

class ParticipatorSchema(ma.ModelSchema):
    class Meta:
        model = Participator
        sqla_session = db.session
