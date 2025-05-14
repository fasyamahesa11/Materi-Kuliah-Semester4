// db/schema.js
export const onInitDB = async (db) => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS note (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL
      );
  
      PRAGMA journal_mode=WAL;
    `);
  };