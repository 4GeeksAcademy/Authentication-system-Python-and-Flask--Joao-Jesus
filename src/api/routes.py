"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity




api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/validate', methods=['GET'])
@jwt_required()
def validate_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200

@api.route('/log-in', methods=['POST'])
def login_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email = email, password = password).first()

    if user is None:
        return jsonify({"msg": "Wrong email or password"}), 401
    
    jwt_token = create_access_token(identity = user.id)
    return jsonify({ "token": jwt_token, "user_id": user.id })

@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/sign-up', methods=['POST'])
def signup_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User (
        email = email, 
        password = password,
        is_active = True
        ) 

    if email is None:
        return jsonify({"msg": "email can not be empty"}), 400
    if password is None:
        return jsonify({"msg": "password can not be empty"}), 400
    
    db.session.add(user)
    db.session.commit()

    return jsonify({ "msg": "New user signed up"}), 201

