const mysql = require('mysql2');

// Configura la connessione
const db = mysql.createConnection({
  host: 'localhost',     // o l'indirizzo del tuo server DB
  user: 'root',          // il tuo utente MySQL
  password: '',  // la tua password MySQL
  database: 'watchlist_db'   // il nome del database da usare
});

// Connetti al DB
db.connect((err) => {
  if (err) {
    console.error('Errore connessione MySQL:', err);
  } else {
    console.log('Connesso a MySQL!');
  }
});

const executeQuery = async (query,param=[])=>{
    return await new Promise((resolve,reject)=>{
        const result = db.query(query,param,(err,result)=>{
            if(err){
                return reject(new Error())
            }
            resolve(result)
        })
        return result
    })
}

module.exports = {
  db,
  executeQuery
}
