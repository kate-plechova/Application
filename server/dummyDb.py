from dtos import Book, BookDto

class DummyDb:

    def __init__(self):
        self.books = {
            "id1": Book(id="id1", title="title 1", author="Author 1", publisher="publisher 1"),
            "id2": Book(id="id2", title="title 2", author="Author 2", publisher="publisher 1"),
            "id3": Book(id="id3", title="title 3", author="Author 3", publisher="publisher 1")
        }
        self.users = {
            "some token": {
                "id": "user1",
                "username": "kate@mail.com",
                "password": "1111"
            },
        } # user_id - username, password
        self.bookmarks = {
            "user1": []
        } # user_id - array of book ids

    def getBook(self, token, id):
        if id not in self.books:
            return None  
        if token is None:
            return BookDto(**self.books[id].model_dump())
        user_id = self.users[token]["id"]
        book_dto = BookDto(**self.books[id].model_dump(), isBookmarked=id in self.bookmarks[user_id])
        return book_dto.model_dump()

    def search(self, token, q, title, author, language, publisher):
        dtos = []
        for id, book in self.books.items():
            # Basic search logic: match specific fields if provided, otherwise check 'q' against title/author
            match_title = title is None or book.title == title
            match_author = author is None or book.author == author
            match_q = q is None or (q.lower() in book.title.lower() or q.lower() in book.author.lower())
            
            if match_title and match_author and match_q:
                book_dto = BookDto(**book.model_dump())
                if token:
                    user_id = self.users[token]["id"]
                    bookmarks = self.bookmarks[user_id]
                    book_dto.isBookmarked = book.id in bookmarks
                dtos.append(book_dto.model_dump())
                
        return { "books": dtos }


    def get_bookmarks(self, user_id):
        if user_id not in self.bookmarks:   
            return None

        books = []
        for book_id in self.bookmarks[user_id]:
            books.append(BookDto(**self.books[book_id].model_dump(), isBookmarked=True).model_dump())

        return {"books": books }

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