from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import metadata

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

class Stock(db.Model, SerializerMixin):
    __tablename__='stocks'

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, nullable=False)
    companyName = db.Column(db.String, nullable=False)
    industry = db.Column(db.String, nullable = False)

class Member(db.Model, SerializerMixin):
    __tablename__='members'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable = False)
    district = db.Column(db.String, nullable=False)
    party = db.Column(db.String)
    bioguide_id = db.Column(db.Integer)
    date_current = db.Column(db.String)

class Transaction(db.Model, SerializerMixin):
    __tablename__='transactions'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Integer)
    type = db.Column(db.String)
    amount = db.Column(db.Float)
    member_id = db.Column(db.Integer, db.ForeignKey('members.id'))
    stock_id = db.Column(db.Integer, db.ForeignKey('stocks.id'))
    

