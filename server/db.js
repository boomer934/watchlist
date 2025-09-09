const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "watchlist_db"
});

db.connect(err => {
  if (err) {
    console.error('Errore connessione MySQL:', err);
  } else {
    console.log('Connessione MySQL stabilita!');
  }
});

const executeQuery = async (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = { db, executeQuery };
