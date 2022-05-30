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
        await databaseConnection.query(requeteSQL, [titre, description, lieu, monnaie])
        res.status(200).send("Vous avez bien ajouté une annonce !")
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// PUT Modifie l'annonce selon id_annonce
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { titre, description, lieu, monnaie } = req.body;
        const requeteSQL = 'UPDATE annonces SET titre = ?, description = ?, lieu = ?, monnaie = ? WHERE id_annonce = ?'
        await databaseConnection.query(requeteSQL, [titre, description, lieu, monnaie, id])
        res.status(200).send(`L'annonce ${titre} a bien été modifié.`)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// DELETE Supprimer l'annonce selon id_annonce
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const requeteSQL = 'DELETE FROM annonces WHERE id_annonce = ?'
        await databaseConnection.query(requeteSQL, [id])
        res.status(200).send(`L'annonce a bien été supprimé.`)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router