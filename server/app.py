from flask import Flask, jsonify, request
import os
import requests
from flask_migrate import Migrate
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
CORS(app)


@app.route('/import', methods=['GET'])
def handle_import_request():
    # Process the import request
    return jsonify({'message': 'Import request processed successfully'})

@app.route('/')
def root():
    return '<h1>LawmakerLedger</h1>'

@app.route('/members', methods=['GET'])
def all_members():
    member_obj = Member.query.all()
    member_dict = [member.to_dict() for member in member_obj]
    return jsonify(member_dict), 200


@app.route('/members/<int:id>', methods=['GET'])
def member_by_id(id):
    member = Member.query.filter(Member.id == id).first()
    if member is None:
        return {"error": "Congressperson not found."}, 404
    else:
        return member.to_dict(), 200

@app.route('/transactions')
def all_transactions():
    transaction_obj = Transaction.query.all()
    transaction_dict = []
    for transaction in transaction_obj:
        transaction_dict.append(transaction.to_dict())
    return transaction_dict, 200

@app.route('/stocks', methods=['GET'])
def all_stocks():
    stock_obj = Stock.query.all()
    stock_dict = [stock.to_dict() for stock in stock_obj]
    return jsonify(stock_dict), 200

@app.route('/stocks/<string:ticker>', methods=['GET'])
def stock_by_ticker(ticker):
    stock = Stock.query.filter(Stock.ticker == ticker).first()
    if stock is None:
        return {"error": "Stock not found."}, 404
    else:
        return stock.to_dict(), 200

@app.route('/members/<int:member_id>/transactions', methods=['GET'])
def transactions_by_member(member_id):
    transactions = Transaction.query.filter(Transaction.member_id == member_id).all()
    transaction_dict = []
    for transaction in transactions:
        transaction_dict.append(transaction.to_dict())
    return transaction_dict, 200

if __name__ == "__main__":
    app.run(port=5555, debug=True)