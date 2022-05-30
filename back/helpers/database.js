// CONNEXION A LA BASE DE DONNEES (MARIADB)
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

// GESTION DES ERREURS DE CONNEXION A LA BASE DE DONNEES
pool.getConnection((err, connection) => {
    if (err) {
        switch (err.code) {
            case 'PROTOCOL__CONNECTION_LOST':
                console.error('Connexion à la base de données perdue.');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('Trop de connexion demandées à la base de données.');
                break;
            case 'ERRCONNREFUSED':
                console.error('La connexion à la base de données à été refusé');
                break;
            default:
                break;
        }
    }
    (connection) ? connection.release() : null

    return;
})

module.exports = pool
