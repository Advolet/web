class General():
    BASE_DEBUG_ADDRESS = 'http://127.0.0.1:5000'
    #FIX REQUIRED
    BASE_PRODUCTION_ADDRESS = 'PRODUCTION ADDRESS'

    CONFIG_FILE = 'config.cfg'
    HASH_TYPE = 'utf-8'
    content_type_app_json = 'application/json'


class Route():
    BASE = '/api'

    SIGNUP = BASE + '/signup'
    SIGNIN = BASE + '/signin'


class Response_code():
    NOT_FOUND = 404
    BAD_REQUEST = 400
    OK = 200
    ALREDY_EXIST = 409

class Request():
    NAME = 'name'
    PASSWORD = 'pass'
    EMAIL = 'email'
    PHONE_NUMBER = 'phone' 
    ACCOUNT_TYPE = 'type'
