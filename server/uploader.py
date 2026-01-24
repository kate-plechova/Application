import mysql.connector

conn = mysql.connector.connect(
    host="sql.freedb.tech",
    port=3306,
    user="freedb_vitmast",
    password="eeGc$QyWSm3pS*j",
    database="freedb_books",
    autocommit=True
)

cursor = conn.cursor()

with open("dump.sql", "r", encoding="utf-8") as f:
    sql = ""
    for line in f: 
        if line.strip().startswith("--") or line.strip() == "": 
            continue # skip comments and empty lines 
        sql += line 
        if line.strip().endswith(";"): 
            try: 
                cursor.execute(sql) 
            except Exception as e: 
                print("Error:", e) 
                print("Failed SQL:", sql[:400]) 
                break 
            sql = ""

cursor.close()
conn.close()

