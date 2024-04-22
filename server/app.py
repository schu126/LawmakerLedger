from flask import Flask, jsonify
import os
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

@app.route('/')
def root():
    return '<h1>LawmakerLedger</h1>'

if __name__ == "__main__":
    app.run(port=5555, debug=True)