from app import app
from models import db, Transaction, Member, Stock
from trade_requests import get_senate_trade_data, get_house_trade_data

with app.app_context():
    print('deleting all data...')
    Transaction.query.delete()
    Member.query.delete()
    Stock.query.delete()

    print('adding all transactions...')
    senate_trade_data = get_senate_trade_data()
    house_trade_data = get_house_trade_data()

    if senate_trade_data and house_trade_data:
        transactions = []
        members = {}
        stocks = {}

        def process_trade_data(trade_data, chamber):
            for trade in trade_data:
                # Create Member object
                member_name = trade['senator'] if chamber == 'senate' else trade['representative']
                if member_name not in members:
                    member = Member(
                        name=member_name,
                        district='N/A',
                        party=trade.get('party', 'N/A'),
                        bioguide_id=None,
                        date_current=None
                    )
                    members[member_name] = member

                # Create Stock object
                stock_ticker = trade['ticker']
                stock = None
                if stock_ticker != 'N/A':
                    stock_name = trade.get('asset_description')
                    if stock_name:
                        stock_industry = trade.get('industry', 'N/A')  # Use 'N/A' if 'industry' is not present
                        if stock_ticker not in stocks:
                            stock = Stock(
                                ticker=stock_ticker,
                                company_name=stock_name,
                                industry=stock_industry
                            )
                            stocks[stock_ticker] = stock
                        else:
                            stock = stocks[stock_ticker]

                # Create Transaction object
                transaction = Transaction(
                    date=trade.get('transaction_date', ''),
                    type=trade['type'],
                    amount=trade['amount'],
                    member=members[member_name],
                    stock=stock
                )
                transactions.append(transaction)
        # Process Senate trade data
        process_trade_data(senate_trade_data, 'senate')

        # Process House trade data
        process_trade_data(house_trade_data, 'house')

        db.session.add_all(transactions)
        db.session.commit()

        print('adding all members...')
        db.session.add_all(members.values())
        db.session.commit()

        print('adding all stocks...')
        if stocks:
            db.session.add_all(stocks.values())
            db.session.commit()
    else:
        print("Error fetching data")