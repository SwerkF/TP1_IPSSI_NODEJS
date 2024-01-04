const database = require('../database/database.js');
const bcrypt = require('bcrypt');

module.exports = {
    // CRUD COMMENTAIRE

    // Create
    create: (req, res) => {
        // Récupération des données envoyées
        const commentaire = req.body;
        // Connexion à la base de données
        console.log(commentaire)
        database.query('INSERT INTO commentaire SET ?', commentaire, (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ flash: "commentaire has been created !" });
            }
        });
    },

    // GetAll
    getAll: (req, res) => {
        // Connexion à la base de données
        database.query('SELECT * FROM commentaire', (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ commentaires: results });
            }
        });
    },

    // GetOne
    getById: (req, res) => {
        // Récupération des données envoyées
        const idCommentaire = req.params.id;
        // Connexion à la base de données
        database.query('SELECT * FROM commentaire WHERE id = ?', idCommentaire, (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ commentaire: results[0] });
            }
        });
    },

    // Update
    update: (req, res) => {
        // Récupération des données envoyées
        const idCommentaire = req.params.id;
        const commentaire = req.body;
        // Connexion à la base de données
        database.query('UPDATE commentaire SET ? WHERE id = ?', [commentaire, idCommentaire], (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ flash: "commentaire has been updated !" });
            }
        });
    },

    // Delete
    delete: (req, res) => {
        // Récupération des données envoyées
        const idCommentaire = req.params.id;
        // Connexion à la base de données
        database.query('DELETE FROM commentaire WHERE id = ?', idCommentaire, (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ flash: "commentaire has been deleted !" });
            }
        });
    },

    // Récupérer les commentaires inférieur à une date
    getByDate: (req, res) => {
        console.log(req.params)
        // Récupération des données envoyées
        const dateCommentaire = req.params.date;
        // Connexion à la base de données
        database.query('SELECT * FROM commentaire WHERE date_creation < ?', dateCommentaire, (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                console.log(results);
                res.status(200).json({ commentaires: results });
            }
        });
    }
    
}