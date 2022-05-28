const express = require('express')
const router = express.Router()

router.get('/annonces', (req, res) => {
    res.status(200).json(annonces)
})

router.get('/annonces/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const annonce = annonces.find(annonce => annonce.id === id)
    res.status(200).json(annonce)
})

router.post('/annonces', (req, res) => {
    annonces.push(req.body)
    res.status(200).json(annonces)
    console.log("Vous avez bien ajouté l'annonce", annonces)
})

router.put('/annonces/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let annonce = annonces.find(annonce => annonce.id === id)
    annonce.titre = req.body.titre,
        annonce.description = req.body.description,
        annonce.Lieu = req.body.Lieu,
        res.status(200).json(annonce)
})

module.exports = router