import bcrypt

from .models import User
from .constants import General

def authenticate(email, password):
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.checkpw(password.encode(General.HASH_TYPE), user.password):
        return user

def identity(payload):
    user_id = payload['identity']
    return User.query.filter_by(id=user_id).first()