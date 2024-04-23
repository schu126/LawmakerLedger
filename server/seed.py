from app import app
from models import db, Transaction, Member, Stock

with app.app_context():
    
    print('deleting all data...')
    Transaction.query.delete()
    Member.query.delete()
    Stock.query.delete()

    print('adding all transactions...')
    transactions = [
        Transaction(
        )
    ]

    db.session.add_all(transactions)
    db.session.commit()

    print('adding all members...')
    members = [
        Member(
        )
    ]

    db.session.add_all(members)
    db.session.commit()

    print('adding all stocks...')
    stocks = [
        Stock(
        )
    ]

    db.session.add_all(stocks)
    db.session.commit()