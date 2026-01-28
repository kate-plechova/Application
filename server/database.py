import mysql.connector
from mysql.connector import pooling
from dtos import BookDto, GeneralStatsDto, SubjectStatDto, SubjectRatingDto, LanguageStatDto, FavoriteWorkDto, StatisticsDto
import uuid
from dotenv import load_dotenv
import os

load_dotenv()

class DB:
    def __init__(self):
        self.db_config = {
            'user': os.getenv("DB_USER"),
            'password': os.getenv("DB_PASSWORD"),
            'host': os.getenv("DB_HOST"),
            'database': os.getenv("DB_NAME"),
            'pool_name': 'mypool',
            'pool_size': 5
        }
        # Initialize connection pool
        try:
            self.pool = mysql.connector.pooling.MySQLConnectionPool(**self.db_config)
        except mysql.connector.Error as err:
            print(f"Error creating connection pool: {err}")
            raise

        self._ensure_tables()

    def _get_connection(self):
        return self.pool.get_connection()

    def _ensure_tables(self):
        """Ensures necessary tables and columns exist."""
        conn = self._get_connection()
        cursor = conn.cursor()
        try:
            # Ensure password column in users
            cursor.execute("SHOW COLUMNS FROM users LIKE 'password'")
            if not cursor.fetchone():
                cursor.execute("ALTER TABLE users ADD COLUMN password VARCHAR(255)")
            
            # Ensure sessions table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS sessions (
                    token VARCHAR(255) PRIMARY KEY,
                    user_id INT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                ) ENGINE=InnoDB
            """)
            conn.commit()
        except Exception as e:
            print(f"Error initializing DB schema: {e}")
        finally:
            cursor.close()
            conn.close()

    def get_user_id_by_token(self, token):
        if not token:
            return None
        conn = self._get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT user_id FROM sessions WHERE token = %s", (token,))
            result = cursor.fetchone()
            return result[0] if result else None
        except Exception as e:
            print(f"Error getting user by token: {e}")
            return None
        finally:
            cursor.close()
            conn.close()

    def getBook(self, token, book_id):
        conn = self._get_connection()
        cursor = conn.cursor(dictionary=True)
        try:
            query = """
                SELECT w.id, w.title, w.rating, w.pages_avg, l.full_name as language,
                       GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') as author,
                       GROUP_CONCAT(DISTINCT p.name SEPARATOR ', ') as publisher
                FROM works w
                LEFT JOIN work_authors wa ON w.id = wa.work_id
                LEFT JOIN authors a ON wa.author_id = a.id
                LEFT JOIN work_publishers wp ON w.id = wp.work_id
                LEFT JOIN publishers p ON wp.publisher_id = p.id
                LEFT JOIN languages l ON w.original_language = l.code
                WHERE w.id = %s
                GROUP BY w.id
            """
            cursor.execute(query, (int(book_id),))
            book = cursor.fetchone()
            
            if not book:
                return None

            is_bookmarked = False
            if token:
                user_id = int(token)
                if user_id:
                    cursor.execute(
                        "SELECT 1 FROM user_favorites WHERE user_id = %s AND work_id = %s",
                        (user_id, book_id)
                    )
                    is_bookmarked = cursor.fetchone() is not None

            dto = BookDto(
                id=str(book['id']), 
                title=book['title'],
                author=book['author'] or "Unknown",
                publisher=book['publisher'] or "Unknown",
                rating=float(book['rating']),
                translations=[],
                isBookmarked=is_bookmarked,
                pages=book['pages_avg'],
                language=book['language']
            )
            return dto.model_dump()
        except Exception as e:
            print(f"Error getting book: {e}")
            return None
        finally:
            cursor.close()
            conn.close()


    def search(self, token, q, title, author, language_id, publisher, subject):
        conn = self._get_connection()
        cursor = conn.cursor(dictionary=True)
        try:
            sql = """
                SELECT w.id, w.title, w.rating, w.pages_avg, l.full_name as language,
                       GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') as author_name,
                       GROUP_CONCAT(DISTINCT p.name SEPARATOR ', ') as publisher_name
                FROM works w
                LEFT JOIN work_authors wa ON w.id = wa.work_id
                LEFT JOIN authors a ON wa.author_id = a.id
                LEFT JOIN work_publishers wp ON w.id = wp.work_id
                LEFT JOIN publishers p ON wp.publisher_id = p.id
                LEFT JOIN languages l ON w.original_language = l.code
                LEFT JOIN work_subjects ws ON w.id = ws.work_id
                LEFT JOIN subjects s ON ws.subject_id = s.id
            """
            
            conditions = []
            params = []

            if q:
                keywords = q.lower().split() 
                if not keywords:
                    conditions.append("(w.title LIKE %s OR a.name LIKE %s)")
                    params.extend([f"%{q}%", f"%{q}%"])
                else:
                    for word in keywords:
                        clean_word = word.strip()
                        if clean_word:
                            conditions.append("(w.title LIKE %s OR a.name LIKE %s)")
                            params.extend([f"%{clean_word}%", f"%{clean_word}%"])
            
            if title:
                title_words = title.lower().split()
                for word in title_words:
                    conditions.append("w.title LIKE %s")
                    params.append(f"%{word}%")
                
            if author:
                author_words = author.lower().split()
                for word in author_words:
                    conditions.append("a.name LIKE %s")
                    params.append(f"%{word}%")
                
            if language_id:
                conditions.append("l.code = %s")
                params.append(language_id)
                
            if publisher:
                pub_words = publisher.lower().split()
                for word in pub_words:
                    conditions.append("p.name LIKE %s")
                    params.append(f"%{word}%")

            if subject:
                subj_words = subject.lower().split()
                for word in subj_words:
                    conditions.append("s.name LIKE %s")
                    params.append(f"%{word}%")

            if conditions:
                sql += " WHERE " + " AND ".join(conditions)
            
            sql += " GROUP BY w.id, w.title, w.rating, w.pages_avg, l.full_name ORDER BY w.rating DESC LIMIT 100"
            
            cursor.execute(sql, params)
            results = cursor.fetchall()
            
            user_id = None
            if token:
                user_id = int(token)
                
            dtos = []
            for row in results:
                is_bookmarked = False
                if user_id:
                    cursor.execute(
                        "SELECT 1 FROM user_favorites WHERE user_id = %s AND work_id = %s",
                        (user_id, row['id'])
                    )
                    is_bookmarked = cursor.fetchone() is not None
                
                book = BookDto(
                    id=str(row['id']), 
                    title=row['title'],
                    author=row['author_name'] or "Unknown",
                    publisher=row['publisher_name'] or "Unknown",
                    rating=float(row['rating'] or 0),
                    translations=[],
                    language=row['language'] or "Unknown",
                    isBookmarked=is_bookmarked,
                    pages=row['pages_avg'],
                )
                dtos.append(book.model_dump())
                
            return {"books": dtos}
        except Exception as e:
            print(f"Error searching books: {e}")
            return {"books": []}
        finally:
            cursor.close()
            conn.close()

    def get_bookmarks(self, user_id):
        conn = self._get_connection()
        cursor = conn.cursor(dictionary=True)
        try:
            sql = """
                SELECT w.id, w.title, w.rating, w.pages_avg, w.original_language,
                       GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') as author_name,
                       GROUP_CONCAT(DISTINCT p.name SEPARATOR ', ') as publisher_name
                FROM user_favorites uf
                JOIN works w ON uf.work_id = w.id
                LEFT JOIN work_authors wa ON w.id = wa.work_id
                LEFT JOIN authors a ON wa.author_id = a.id
                LEFT JOIN work_publishers wp ON w.id = wp.work_id
                LEFT JOIN publishers p ON wp.publisher_id = p.id
                WHERE uf.user_id = %s
                GROUP BY w.id
            """
            cursor.execute(sql, (user_id,))
            results = cursor.fetchall()
            
            books = []
            for row in results:
                book = BookDto(
                    id=str(row['id']), 
                    title=row['title'],
                    author=row['author_name'] or "Unknown",
                    publisher=row['publisher_name'] or "Unknown",
                    rating=float(row['rating']),
                    translations=[],
                    language=row['original_language'],
                    isBookmarked=True,
                    pages=row['pages_avg'],
                )
                books.append(book.model_dump())
            return {"books": books}
        except Exception as e:
            print(f"Error getting bookmarks: {e}")
            return {"books": []}
        finally:
            cursor.close()
            conn.close()

    def save_bookmark(self, user_id, book_id):
        conn = self._get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute("INSERT INTO user_favorites (user_id, work_id) VALUES (%s, %s)", (int(user_id), int(book_id)))
            conn.commit()
            return True
        except Exception as e:
            print(f"Error saving bookmark: {e}")
            return False
        finally:
            cursor.close()
            conn.close()

    def remove_bookmark(self, user_id, book_id):
        conn = self._get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute("DELETE FROM user_favorites WHERE user_id = %s AND work_id = %s", (int(user_id), int(book_id)))
            conn.commit()
            return True
        except Exception as e:
            print(f"Error removing bookmark: {e}")
            return False
        finally:
            cursor.close()
            conn.close()

    def signup(self, username, password):
        conn = self._get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
            if cursor.fetchone():
                return False
            
            cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
            conn.commit()
            return True
        except Exception as e:
            print(f"Error signup: {e}")
            return False
        finally:
            cursor.close()
            conn.close()

    def signin(self, username, password):
        conn = self._get_connection()
        cursor = conn.cursor(dictionary=True)
        try:
            cursor.execute("SELECT id, username FROM users WHERE username = %s AND password = %s", (username, password))
            user = cursor.fetchone()
            
            if user:
                token = str(user['id'])
                return {
                    "id": str(user["id"]),
                    "username": user["username"],
                    "token": token
                }
            return None
        except Exception as e:
            print(f"Error signin: {e}")
            return None
        finally:
            cursor.close()
            conn.close()

    def get_langs(self):
        conn = self._get_connection() 
        cursor = conn.cursor()
        try:
            sql = "SELECT code, full_name from languages;"
            cursor.execute(sql)
            result = cursor.fetchall()
            dto = {}
            for row in result:
                dto[row[0]] = row[1]
            return dto
        finally: 
            cursor.close()
            conn.close()

    def get_subjects(self):
        conn = self._get_connection() 
        cursor = conn.cursor()
        try:
            sql = "SELECT id, name from subjects;"
            cursor.execute(sql)
            result = cursor.fetchall()
            dto = {}
            for row in result:
                dto[row[0]] = row[1]
            return dto
        finally: 
            cursor.close()
            conn.close()

    def get_statistics(self) -> StatisticsDto:
        conn = self._get_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            # General Stats
            cursor.execute("SELECT COUNT(*) AS total_books FROM works")
            total_books = cursor.fetchone()['total_books']

            cursor.execute("SELECT COUNT(*) AS total_authors FROM authors")
            total_authors = cursor.fetchone()['total_authors']

            cursor.execute("SELECT COUNT(*) AS total_subjects FROM subjects")
            total_subjects = cursor.fetchone()['total_subjects']

            cursor.execute("SELECT COUNT(*) AS total_languages FROM languages")
            total_languages = cursor.fetchone()['total_languages']

            cursor.execute("SELECT AVG(rating) AS average_rating FROM works WHERE rating IS NOT NULL")
            average_rating = cursor.fetchone()['average_rating']
            
            general_stats = GeneralStatsDto(
                total_books=total_books,
                total_authors=total_authors,
                total_subjects=total_subjects,
                total_languages=total_languages,
                average_rating=round(average_rating, 2) if average_rating is not None else None
            )

            # Top Subjects by Books
            cursor.execute("""
                SELECT
                    s.name,
                    COUNT(ws.work_id) AS book_count
                FROM
                    subjects s
                JOIN
                    work_subjects ws ON s.id = ws.subject_id
                GROUP BY
                    s.name
                ORDER BY
                    book_count DESC
                LIMIT 25
            """)
            top_subjects_by_books = [SubjectStatDto(**row) for row in cursor.fetchall()]

            # Average Rating per Subject
            cursor.execute("""
                SELECT
                    s.name,
                    AVG(w.rating) AS average_rating
                FROM
                    subjects s
                JOIN
                    work_subjects ws ON s.id = ws.subject_id
                JOIN
                    works w ON ws.work_id = w.id
                WHERE
                    w.rating IS NOT NULL
                GROUP BY
                    s.name
                ORDER BY
                    average_rating DESC
                LIMIT 25
            """)
            top_subjects_by_rating = [SubjectRatingDto(name=row['name'], average_rating=round(row['average_rating'], 2)) for row in cursor.fetchall()]

            # Language Statistics
            cursor.execute("""
                SELECT
                    l.full_name AS language_name,
                    COUNT(w.id) AS total_books,
                    SUM(CASE WHEN w.is_translation = TRUE THEN 1 ELSE 0 END) AS translated_books,
                    (SUM(CASE WHEN w.is_translation = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(w.id)) AS translation_percentage
                FROM
                    languages l
                JOIN
                    works w ON l.code = w.original_language
                GROUP BY
                    l.full_name
                ORDER BY
                    total_books DESC
            """)
            language_stats = []
            results = cursor.fetchall()
            for row in results:
                language_stats.append(LanguageStatDto(
                    language_name=row['language_name'],
                    total_books=row['total_books'],
                    translated_books=row['translated_books'],
                    translation_percentage=round(row['translation_percentage'], 2)
                ))

            # Top Works by Favorites
            cursor.execute("""
                SELECT
                    w.title,
                    COUNT(uf.work_id) AS favorite_count
                FROM
                    works w
                JOIN
                    user_favorites uf ON w.id = uf.work_id
                GROUP BY
                    w.title
                ORDER BY
                    favorite_count DESC
                LIMIT 10
            """)
            top_works_by_favorites = [FavoriteWorkDto(**row) for row in cursor.fetchall()]

            return StatisticsDto(
                general_stats=general_stats,
                top_subjects_by_books=top_subjects_by_books,
                top_subjects_by_rating=top_subjects_by_rating,
                language_stats=language_stats,
                top_works_by_favorites=top_works_by_favorites
            )

        except Exception as e:
            print(f"Error getting statistics: {e}")
            return None
        finally:
            cursor.close()
            conn.close()
