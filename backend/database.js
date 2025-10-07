const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "database.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            nome TEXT,
            email TEXT UNIQUE,
            senha TEXT,
            pontuacao INTEGER,
            codigoIndicacao TEXT UNIQUE
        )`, (err) => {
            if (err) {
                
            } else {
                console.log('Tabela "users" criada ou já existente.');
            }
        });
    }
});

module.exports = db;