import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password="secret",
    database="mydb"
)

cursor = conn.cursor()

use_db = "USE mydb"
show_tables = "SHOW TABLES"
get_langs = "SELECT * FROM languages"

# cursor.execute(use_db)
# print(cursor.fetchone())
# cursor.execute(show_tables)
# print(cursor.fetchone())

cursor.execute(get_langs)
print(cursor.fetchall())

cursor.close()
conn.close()
