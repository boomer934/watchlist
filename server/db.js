const mysql = require('mysql2');

// Usa variabili d'ambiente per deploy, altrimenti fallback in locale
const db = mysql.createConnection({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'watchlist_db',
});

db.connect((err) => {
  if (err) {
    console.error('Errore connessione MySQL:', err);
  } else {
    console.log('Connesso a MySQL!');
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