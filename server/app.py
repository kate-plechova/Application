from flask import Flask, jsonify, request
from dummyDb import DummyDb

app = Flask(__name__)
db = DummyDb()

@app.route('/search')
def search():
    """
    extract query parameters
    use dummy function, but assume it will be replaced by real one lately
    """
    q = request.args.get('q')
    title = request.args.get('title')
    author = request.args.get('author')
    publisher = request.args.get('publisher')
    language = request.args.get('language')
    return jsonify(db.search(q, title, author, language, publisher))

@app.route('/bookmarks')
def bookmarks():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return "", 401
    books = db.get_bookmarks(auth_header[7:])
    return jsonify({"books": books})

@app.route("/signup", methods=["POST"])
def signup():
    json = request.get_json()
    username = json["username"]
    password = json["password"]
    db.signup(username, password)
    return "", 200

@app.route("/signin", methods=["POST"])
def signin():
    json = request.get_json()
    username = json["username"]
    password = json["password"]
    res = db.signin(username, password)
    return jsonify(res)
