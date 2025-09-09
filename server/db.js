const mysql = require('mysql2');
require('dotenv').config();

console.log('Connetto a DB host:', process.env.DB_HOST);
console.log('Connetto a DB user:', process.env.DB_USER);
console.log('Connetto a DB password:', process.env.DB_PASSWORD);
console.log('Connetto a DB name:', process.env.DB_NAME);
console.log('Connetto a DB port:', process.env.DB_PORT);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
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
