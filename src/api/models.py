from app import db, ma


# Custom Exception
class NotFoundException(Exception):
    pass


class NotAuthorizedException(Exception):
    pass


class CollisionException(Exception):
    pass


# Participator
class Participator(db.Model):
    __tablename__ = 'participator'
    email = db.Column(db.String(30), primary_key=True)
    firstname = db.Column(db.String(25), nullable=False)
    minit = db.Column(db.String(1))
    lastname = db.Column(db.String(25), nullable=False)
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


# Paper
class Paper(db.Model):
    __tablename__ = 'paper'
    paperid = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    filename = db.Column(db.String(30), nullable=False)
    contactauthoremail = db.Column(db.String(30))
    abstract = db.Column(db.String(120))

    def __init__(self, paperid, title, filename, contactauthoremail, abstract):
        self.paperid = paperid
        self.title = title
        self.filename = filename
        self.contactauthoremail = contactauthoremail
        self.abstract = abstract


class PaperSchema(ma.ModelSchema):
    class Meta:
        model = Paper
        sqla_session = db.session


# Review
class Review(db.Model):
    __tablename__ = 'reviews'
    revemail = db.Column(db.String(30), primary_key=True)
    paperid = db.Column(db.Integer(), primary_key=True)
    techmerit = db.Column(db.Integer())
    readability = db.Column(db.Integer())
    originality = db.Column(db.Integer())
    relavance = db.Column(db.Integer())
    overallrecomm = db.Column(db.Integer())
    commentforcommittee = db.Column(db.String(120))
    commentforauthor = db.Column(db.String(120))

    def __init__(
            self,
            revemail,
            paperid,
            techmerit,
            readability,
            originality,
            relavance,
            overallrecomm,
            commentforcommittee,
            commentforauthor):
        self.revemail = revemail
        self.paperid = paperid
        self.techmerit = techmerit
        self.readability = readability
        self.originality = originality
        self.relavance = relavance
        self.overallrecomm = overallrecomm
        self.commentforcommittee = commentforcommittee
        self.commentforauthor = commentforauthor


class ReviewSchema(ma.ModelSchema):
    class Meta:
        model = Review
        sqla_session = db.session
