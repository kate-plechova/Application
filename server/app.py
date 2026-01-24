from flask import Flask, jsonify, request
from flask_cors import CORS
from database import DB
from pydantic import BaseModel, ValidationError
from typing import Optional
from dtos import BookDto, SearchDto, AuthDto


app = Flask(__name__)
CORS(app)
db = DB()

def get_token():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
    return auth_header[7:]

def get_user_id(token):
    if not token:
        return None
    return db.get_user_id_by_token(token)


@app.route("/book/<book_id>")
def get_book(book_id):
    token = get_token()
    dto = db.getBook(token, book_id)
    if not dto:
        return "", 404
    return jsonify(dto)


@app.route('/books/search')
def search():
    """
    extract query parameters
    """
    try:
        dto = SearchDto(**request.args)
    except ValidationError as e:
        return jsonify(e.errors()), 400

    print(f"search req {dto}")
    token = get_token()
    # Pass subject to search
    result = db.search(token, dto.q, dto.title, dto.author, dto.language, dto.publisher, dto.subject)
    print(f"result: {result}")
    return jsonify( result )

@app.route('/bookmarks')
def bookmarks():
    token = get_token()
    user_id = get_user_id(token)
    if not user_id:
        return "", 401
    
    books = db.get_bookmarks(user_id)
    return jsonify(books)

@app.route("/bookmarks/<book_id>", methods=["POST"])
def add_bookmark(book_id):
    token = get_token()
    user_id = get_user_id(token)
    if not user_id:
        return "", 401
    
    res = db.save_bookmark(user_id, book_id)
    return "", 200 if res else 400

@app.route("/bookmarks/<book_id>", methods=["DELETE"])
def remove_bookmark(book_id):
    token = get_token()
    user_id = get_user_id(token)
    if not user_id:
        return "", 401
    
    res = db.remove_bookmark(user_id, book_id)
    return "", 200 if res else 400


@app.route("/signup", methods=["POST"])
def signup():
    try:
        dto = AuthDto(**request.get_json())
    except ValidationError as e:
        print(f'signup failure {dto}')
        return jsonify(e.errors()), 400

    res = db.signup(dto.username, dto.password)
    if res:
        print(f'signup success {dto}')
        return "", 200
    else:
        return "Username already exists", 400


@app.route("/signin", methods=["POST"])
def signin():
    try:
        dto = AuthDto(**request.get_json())
    except ValidationError as e:
        return jsonify(e.errors()), 400
    res = db.signin(dto.username, dto.password)
    if res:
        print(f'signin success {res}')
        return jsonify(res)
    else:
        return "Invalid credentials", 401

if __name__ == "__main__":
    app.run(debug=True, port=5000)
