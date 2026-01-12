class DummyDb:

    def __init__(self):
        self.books = {
            "id1" : {
                "id": "id1",
                "title": "Title 1",
                "author": "Author 1"
            },
            "id2": {
                "id": "id2",
                "title": "Title 2",
                "author": "Author 2"
            },
            "id3": {
                "id": "id3",
                "title": "Title 3",
                "author": "Author 3"
            }
        }
        self.users = {} # user_id - username, password
        self.bookmarks = {} # user_id - array of book ids

    def search(self, q, title, author, language, publisher):
        results = []
        for id, book in self.books.items():
            # Basic search logic: match specific fields if provided, otherwise check 'q' against title/author
            match_title = title is None or book["title"] == title
            match_author = author is None or book["author"] == author
            match_q = q is None or (q.lower() in book["title"].lower() or q.lower() in book["author"].lower())
            
            if match_title and match_author and match_q:
                results.append(book)
        return { "books": results }


    def get_bookmarks(self, user_id):
        if user_id not in self.bookmarks:   
            return None

        results = []
        for book_id in self.bookmarks[user_id]:
            results.append(self.books[book_id])

        return { "books": results }

    def save_bookmark(self, user_id, book_id):
        if user_id not in self.bookmarks:
            return False
        if book_id not in self.books:
            return False
        if book_id not in self.bookmarks[user_id]:
            self.bookmarks[user_id].append(book_id)
        return True

    def remove_bookmark(self, user_id, book_id):
        if user_id not in self.bookmarks:
            return False
        if book_id in self.bookmarks[user_id]:
            self.bookmarks[user_id].remove(book_id)
        return True

    def signup(self, username, password):
        # Check if username already exists in values
        for user in self.users.values():
            if user["username"] == username:
                return False

        id = f"id{len(self.users) + 1}"
        self.users[id] = {
            "id": id,
            "username": username,
            "password": password
        }
        self.bookmarks[id] = []
        return True

    def signin(self, username, password):
        for user in self.users.values():
            if username == user['username'] and password == user['password']:
                return {
                    "id": user["id"],
                    "username": user["username"],
                    "token": "some token"
                }
        return None