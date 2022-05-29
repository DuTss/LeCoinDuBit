const express = require('express')
const router = express.Router()
const databaseConnection = require('../helpers/database.js')

// GET Affiche TOUTES les annonces
router.get('/', async (req, res) => {
    try {
        const requeteSQL = 'SELECT id_annonce,titre,description,lieu,monnaie FROM annonces'
        const rows = await databaseConnection.query(requeteSQL)
        res.status(200).json(rows)
        console.log('Vous avez bien affiché les annonces');
    } catch (error) {
        res.status(400).send(error.message)
    }
})


// GET Affiche UNE annonce SELON id_annonce
router.get('/:id', async (req, res) => {
    try {
        const requeteSQL = 'SELECT id_annonce,titre,description,lieu,monnaie FROM annonces WHERE id_annonce=?'
        const rows = await databaseConnection.query(requeteSQL, req.params.id)
        res.status(200).json(rows)
        console.log('Vous avez bien affiché UNE annonce');

    } catch (error) {
        res.status(400).send(error.message)
    }
})


// POST Ajoute UNE annonce
router.post('/', async (req, res) => {
    try {
        const { titre, description, lieu, monnaie } = req.body
        const requeteSQL = 'INSERT INTO annonces (titre,description,lieu,monnaie) VALUES (?,?,?,?)'
        const resultat = await databaseConnection.query(requeteSQL, [titre, description, lieu, monnaie])
        res.status(200).json(JSON.stringify(resultat))
        // Do not know how to serialize a BigInt !!!!!! ------------------- PROBLEME
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { titre, description, lieu, monnaie } = req.body;
        const requeteSQL = 'UPDATE annonces SET titre = ?, description = ?, lieu = ?, monnaie = ? WHERE id_annonce = ?'
        const resultat = await databaseConnection.query(requeteSQL, [titre, description, lieu, monnaie, id])
        res.status(200).json(JSON.stringify(resultat))
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const requeteSQL = 'DELETE FROM annonces WHERE id_annonce = ?'
        const resultat = await databaseConnection.query(requeteSQL, [id])
        res.status(200).json(JSON.stringify(resultat))
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// router.put('/annonces/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     let annonce = annonces.find(annonce => annonce.id === id)
//     annonce.titre = req.body.titre,
//         annonce.description = req.body.description,
//         annonce.Lieu = req.body.Lieu,
//         res.status(200).json(annonce)
// })

module.exports = router