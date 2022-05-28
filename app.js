const express = require('express');
const app = express();
require('dotenv').config();

// CONNEXION A LA BASE DE DONNEES (MARIADB)
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});
pool.getConnection()
    .then(conn => {
        console.log("Vous êtes bien connecté à la base de données");
        conn.query("SELECT id_annonce, titre, description, lieu FROM coindubit.annonces")
            .then((rows) => {
                // " CREATE TABLE myTable (id int, val varchar(255)) "
                return conn.query("INSERT INTO coindubit.annonces (titre, description, lieu) VALUES (?, ?, ?)", ["Deuxième annonce", "Descritpion de fou pour la deuxième annonce", "Chalon sur saone"]);
            })
            .then((res) => {
                console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
                conn.end();
            })
            .catch(err => {
                //handle error
                console.log(err);
                conn.end();
            })

    }).catch(err => {
        console.log(err, "La connexion à la base de données à échoué.");
    });

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// ROUTES
const annonceRoute = require('./routes/annonces')


app.get('/annonces', annonceRoute)

app.listen(process.env.PORT, () => {
    console.log(`Tourne sur le port : ${process.env.PORT}`)
})