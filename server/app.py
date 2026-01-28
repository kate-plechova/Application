from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from dummyDb import DummyDb
from database import DB
from pydantic import BaseModel, ValidationError
from typing import Optional
from dtos import BookDto, SearchDto, AuthDto


app = Flask(
    __name__,
    static_folder="../client/dist/assets",
    template_folder="../client/dist"
)
CORS(app)
# db = DummyDb()
db = DB()


def get_token():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
    return auth_header[7:]

@app.route('/')
def serve_index():
    return send_from_directory(app.template_folder, 'index.html')

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)


@app.route("/book/<book_id>")
def get_book(book_id):
    # if book_id not in db.books:
    #     return "", 404
    token = get_token()
    dto = db.getBook(token, book_id)
    return jsonify(dto)


@app.route('/books/search')
def search():
    """
    extract query parameters
    use dummy function, but assume it will be replaced by real one lately
    """
    try:
        dto = SearchDto(**request.args)
    except ValidationError as e:
        return jsonify(e.errors()), 400

    print(f"search req {dto}")
    token = get_token()
    token = token if token else None
    result = db.search(token, dto.q, dto.title, dto.author, dto.language, dto.publisher, dto.subject)
    print(f"result: {result}")
    return jsonify( result )

@app.route('/bookmarks')
def bookmarks():
    token = get_token()
    # if not token or token not in db.users:
    #     return "", 401
    user_id = int(token) # db.users[token]["id"]
    books = db.get_bookmarks(user_id)
    return jsonify(books)

@app.route("/bookmarks/<book_id>", methods=["POST"])
def add_bookmark(book_id):
    token = get_token()
    res = db.save_bookmark(token, book_id)
    return "", 200 if res else 400

@app.route("/bookmarks/<book_id>", methods=["DELETE"])
def remove_bookmark(book_id):
    token = get_token()
    res = db.remove_bookmark(token, book_id)
    return "", 200 if res else 400


@app.route("/signup", methods=["POST"])
def signup():
    try:
        dto = AuthDto(**request.get_json())
    except ValidationError as e:
        print(f'signup failure {dto}')
        return jsonify(e.errors()), 400

    db.signup(dto.username, dto.password)
    print(f'signup success {dto}')
    return "", 200


@app.route("/signin", methods=["POST"])
def signin():
    try:
        dto = AuthDto(**request.get_json())
    except ValidationError as e:
        return jsonify(e.errors()), 400
    res = db.signin(dto.username, dto.password)
    print(f'signin success {res}')
    return jsonify(res)

@app.route("/languages")
def get_langs():
    langs = db.get_langs()
    return jsonify(langs)

@app.route("/subjects")
def get_subjects():
    subjects = db.get_subjects()
    return jsonify(subjects)

@app.route("/statistics")
def get_statistics():
    stats_dto = db.get_statistics()
    if stats_dto:
        return jsonify(stats_dto.model_dump())
    return jsonify({"error": "Could not retrieve statistics"}), 500
