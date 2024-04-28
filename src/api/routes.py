"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/log-in', methods=['POST'])
def authncticate_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "Email or Password is Wrong!"}), 401
    
    jwt_token = create_access_token(identity=user.id)
    return jsonify({ "token": jwt_token, "user_id": user.id })


@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():

    response_body = {
        "message": "Hello! This is Private Route. You can see this message ,easn you are authenticated (logged in)"
    }

    return jsonify(response_body), 200


@api.route('/sign-up', methods=['POST'])
def signup_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None:
        return jsonify({"msg": "Email can not be empty"}), 400
    if password is None:
        return jsonify({"msg": "Password can not be empty"}), 400

    user = User(
        email = email,
        password = password,
        is_active = True
    )

    db.session.add(user)
    db.session.commit()
    
    return jsonify({ "msg": "New User Signed up..." }), 201


@api.route('/validate', methods=['GET'])
@jwt_required()
def validate_user():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200

