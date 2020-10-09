import bcrypt
import requests
import json
from flask_jwt import jwt_required, current_identity
from flask import request

from . import app, jwt
from .models import User
from .constants import Route, Response_code, Request, General

@app.route(Route.SIGNUP, methods=['POST'])
def signup():
    request_json = request.get_json()
    if request_json:
        name = request_json.get(Request.NAME)
        email = request_json.get(Request.EMAIL)
        password = request_json.get(Request.PASSWORD)
        phone_number = request_json.get(Request.PHONE_NUMBER)
        account_type = request_json.get(Request.ACCOUNT_TYPE)
        if name and email and password and account_type != None:
            hashed_passowrd = bcrypt.hashpw(password.encode(General.HASH_TYPE), bcrypt.gensalt())
            user = User(name = name, email=email, password=hashed_passowrd, phone_number=phone_number, account_type = account_type)
            inserted = user.insert()
            if inserted:
                #FIX REQUIRED
                #Remove the dependency on Signin API(Impement own JWT token creater)
                json_data = {
                    Request.EMAIL: email,
                    Request.PASSWORD: password
                }
                headers = {'Content-Type': General.content_type_app_json}
                base_address = General.BASE_PRODUCTION_ADDRESS if not app.debug else General.BASE_DEBUG_ADDRESS
                signin_address = base_address + Route.SIGNIN
                response = requests.post(
                    signin_address, 
                    headers=headers, 
                    data=json.dumps(json_data)
                    )
                return response.json(), Response_code.OK
            return {'reason': 'Account already exist'}, Response_code.ALREDY_EXIST
        return {'reason': f'{Request.NAME} or {Request.EMAIL} or {Request.PASSWORD} or {Request.ACCOUNT_TYPE} not found'}, Response_code.BAD_REQUEST
    return {'reason': 'Required JSON not found'}, Response_code.BAD_REQUEST