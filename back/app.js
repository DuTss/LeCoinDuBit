const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// ROUTES
const annonceRoute = require('./routes/annonces')


app.use('/annonces', annonceRoute)

app.listen(process.env.PORT, () => {
    console.log(`Tourne sur le port : ${process.env.PORT}`)
})