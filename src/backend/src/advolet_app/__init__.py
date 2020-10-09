from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt import JWT

from .constants import General

app = Flask(__name__)

app.config.from_pyfile(General.CONFIG_FILE)
db = SQLAlchemy(app)

from .security import authenticate, identity
jwt = JWT(app, authenticate, identity)

#DO NOT CHANGE THIS
from advolet_app import route