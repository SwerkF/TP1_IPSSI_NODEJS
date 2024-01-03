const database = require('../database.js');
const bcrypt = require('bcrypt');

module.exports = {
    // CRUD COMMENTAIRE

    // Create
    create: (req, res) => {
        // Récupération des données envoyées
        const technologie = req.body;
        // Connexion à la base de données
        database.query('INSERT INTO technologie SET ?', technologie, (err, results) => {
            if (err) {
                res.status(500).json({error: err.message});
            } else {
                res.status(200).json({ flash: "technologie has been created !" });
            }
        });
    },

    // GetAll
    getAll: (req, res) => {
        // Connexion à la base de données
        database.query('SELECT * FROM technologie', (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ technologies: results });
            }
        });
    },

    // GetOne
    getById: (req, res) => {
        // Récupération des données envoyées
        const idTechnologie = req.params.id;
        // Connexion à la base de données
        database.query('SELECT * FROM technologie WHERE id = ?', idTechnologie, (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ technologie: results[0] });
            }
        });
    },

    // Update
    update: (req, res) => {
        // Récupération des données envoyées
        const idTechnologie = req.params.id;
        const technologie = req.body;
        // Connexion à la base de données
        database.query('UPDATE technologie SET ? WHERE id = ?', [technologie, idTechnologie], (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ flash: "technologie has been updated !" });
            }
        });
    },

    // Delete
    delete: (req, res) => {
        // Récupération des données envoyées
        const idTechnologie = req.params.id;
        // Connexion à la base de données
        database.query('DELETE FROM technologie WHERE id = ?', idTechnologie, (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ flash: "Technologie has been deleted !" });
            }
        });
    },

    // Récupérer les commentaires d'un utilisateur sur une technologie
    getCommentaires: (req, res) => {
        // Récupération des données envoyées
        const idTechnologie = req.params.id;
        // Connexion à la base de données
        database.query('SELECT * FROM commentaire WHERE technologie_id = ?', idTechnologie, (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ commentaires: results });
            }
        });
    }
    
}