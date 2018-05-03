CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    auth_id TEXT,
    name VARCHAR(50),
    img TEXT,
    username VARCHAR(50),
    email VARCHAR(50),
    active_event_id TEXT
),
CREATE TABLE IF NOT EXISTS friends(
    friends_id SERIAL PRIMARY KEY,
    user1_id TEXT,
    user2_id TEXT
),
CREATE TABLE IF NOT EXISTS events(
    event_id SERIAL PRIMARY KEY,
    end_user_amount REAL,
    users_invited INTEGER,
    users_accepted INTEGER,
    users_remaining INTEGER,
    host TEXT
),
CREATE TABLE IF NOT EXISTS attendance(
    att_id SERIAL PRIMARY KEY,
    event_id TEXT,
    user_id TEXT
)