CREATE TABLE IF NOT EXISTS books (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 author TEXT NOT NULL,
 published_year INTEGER NOT NULL,
 created_at TEXT DEFAULT (datetime('now','localtime')),
 updated_at TEXT DEFAULT (datetime('now','localtime'))
);