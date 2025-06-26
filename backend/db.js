// backend/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('leads.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
