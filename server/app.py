from flask import Flask, jsonify
import os
import requests
from flask_migrate import Migrate;
from flask_cors import CORS
from models import db, Member, Stock, Transaction

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

@app.route('/import', methods=['GET'])
def handle_import_request():
    trade_data = get_trade_data()  # Get the trade data
    # Process the trade data and save it to the database
    return jsonify({'message': 'Import request processed successfully'})

@app.route('/')
def root():
    return '<h1>LawmakerLedger</h1>'

@app.route('/members', methods=['GET'])
def all_members():
    member_obj = Member.query.all()

    member_dict=[]
    for member in member_obj:
        member_dict.append(member.to_dict())

    return member_dict, 200

@app.route('/members/<int:id>', methods=['GET'])
def member_by_id():
    member_id = Member.query.filter(Member.id == id).first()

    if member_id is None:
        return {"error": "Congressperson not found."}, 404
    else:
        return member_id.to_dict(), 200
    
@app.route('/transactions')
def all_transactions():
    transaction_obj = Transaction.query.all()

    transaction_dict=[]
    for transaction in transaction_obj:
        transaction_dict.append(transaction.to_dict())

    return transaction_dict, 200


if __name__ == "__main__":
    app.run(port=5555, debug=True)