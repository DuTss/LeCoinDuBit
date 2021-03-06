// INITIALISATION DES VARIABLES DES DIFFERENTES DEPENDANCES
const express = require('express');
const app = express();
require('dotenv').config();

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTES
const annonceRoute = require('./routes/annonces')

app.use('/annonces', annonceRoute)

// ECOUTE LE PORT
app.listen(process.env.PORT, () => {
    console.log(`Tourne sur le port : ${process.env.PORT}`)
})