# import os
# import psycopg2
# from dotenv import load_dotenv

# load_dotenv()
# DATABASE_URL = os.getenv("DATABASE_URL")
# conn = None

# def init_db():
#     global conn
#     if conn: 
#         return
#     if not DATABASE_URL:
#         print("DATABASE_URL not set, DB disabled.")
#         return
#     try:
#         conn = psycopg2.connect(DATABASE_URL)
#         cur = conn.cursor()
#         cur.execute("""
#             CREATE TABLE IF NOT EXISTS transcripts (
#                 id SERIAL PRIMARY KEY,
#                 user_id TEXT,
#                 text TEXT,
#                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#                 duration INT,
#                 filename TEXT,
#                 language TEXT
#             );
#         """)
#         conn.commit()
#         cur.close()
#         print("Database connected successfully ✅")
#     except Exception as e:
#         print(f"Database connection failed ❌: {e}")

# def save_transcript(user_id, text, duration, filename, language):
#     global conn
#     if not conn:
#         print("Database not initialized.")
#         return
#     cur = conn.cursor()
#     cur.execute("""
#         INSERT INTO transcripts (user_id, text, duration, filename, language)
#         VALUES (%s, %s, %s, %s, %s);
#     """, (user_id, text, duration, filename, language))
#     conn.commit()
#     cur.close()

# def fetch_transcripts(limit=50):
#     global conn
#     if not conn:
#         return []
#     cur = conn.cursor()
#     cur.execute("""
#         SELECT id, user_id, text, filename, duration, language, created_at
#         FROM transcripts
#         ORDER BY id DESC
#         LIMIT %s;
#     """, (limit,))
#     rows = cur.fetchall()
#     cur.close()
#     return [
#         {
#             "id": r[0],
#             "user_id": r[1],
#             "text": r[2],
#             "filename": r[3],
#             "duration": r[4],
#             "language": r[5],
#             "created_at": r[6].isoformat() if r[6] else None
#         }
#         for r in rows
#     ]
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
conn = None

# -----------------------------
# Initialize Database
# -----------------------------
def init_db():
    """Initialize database connection and create table if not exists."""
    global conn
    if conn:
        return
    if not DATABASE_URL:
        print("DATABASE_URL not set, DB disabled.")
        return
    try:
        conn = psycopg2.connect(DATABASE_URL)
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS transcripts (
                    id SERIAL PRIMARY KEY,
                    user_id TEXT,
                    text TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    duration INT,
                    filename TEXT,
                    language TEXT
                );
            """)
            conn.commit()
        print("✅ Database connected successfully")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")

# -----------------------------
# Save Transcript
# -----------------------------
def save_transcript(user_id, text, duration, filename, language):
    """Save a single transcript record in the database."""
    global conn
    if not conn:
        print("Database not initialized.")
        return
    try:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO transcripts (user_id, text, duration, filename, language)
                VALUES (%s, %s, %s, %s, %s);
            """, (user_id, text, duration, filename, language))
            conn.commit()
    except Exception as e:
        print(f"❌ Failed to save transcript: {e}")

# -----------------------------
# Fetch Transcripts
# -----------------------------
def fetch_transcripts(limit=50):
    """Fetch recent transcripts from database."""
    global conn
    if not conn:
        return []
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, user_id, text, filename, duration, language, created_at
                FROM transcripts
                ORDER BY id DESC
                LIMIT %s;
            """, (limit,))
            rows = cur.fetchall()
            return [
                {
                    "id": r[0],
                    "user_id": r[1],
                    "text": r[2],
                    "filename": r[3],
                    "duration": r[4],
                    "language": r[5],
                    "created_at": r[6].isoformat() if r[6] else None
                } for r in rows
            ]
    except Exception as e:
        print(f"❌ Failed to fetch transcripts: {e}")
        return []
