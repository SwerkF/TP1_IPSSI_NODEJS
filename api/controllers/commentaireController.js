const database = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getAllCommentaires = (req, res, next) => {
    // Connexion à la base de données
    database.query('SELECT commentaire.id as id, commentaire.commentaire, commentaire.date_creation, utilisateur.nom as name, utilisateur.prenom as prenom, technologie.nom as techno FROM commentaire INNER JOIN utilisateur ON commentaire.utilisateur_id = utilisateur.id INNER JOIN technologie ON commentaire.technologie_id = technologie.id WHERE commentaire.is_visible = 1', (err, results) => {
        if (err) {
            res.status(500).json({ flash: err.message });
        } else {
            res.status(200).json({ commentaires: results });
        }
    });
}

exports.getCommentaireById = (req, res, next) => {
    // Récupération des données envoyées
    const idCommentaire = req.params.id;
    // Connexion à la base de données
    database.query('SELECT * FROM commentaire WHERE id = ? AND is_visible = 1', idCommentaire, (err, results) => {
        if (err) {
            res.status(500).json({ flash: err.message });
        } else {
            res.status(200).json({ commentaire: results[0] });
        }
    });
}

exports.createCommentaire = (req, res, next) => {
    // Récupération des données envoyées
    const commentaire = req.body;
    // Connexion à la base de données
    database.query('INSERT INTO commentaire SET ?', commentaire, (err, results) => {
        if (err) {
            res.status(500).json({ flash: err.message });
        } else {
            res.status(201).json({ flash: "commentaire has been created !" });
        }
    });
}

exports.updateCommentaire = (req, res, next) => {
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
}

exports.deleteCommentaire = (req, res, next) => {
    // Récupération des données envoyées
    const idCommentaire = req.params.id;
    // Connexion à la base de données
    database.query('UPDATE commentaire SET is_visible = 0 WHERE id = ?', idCommentaire, (err, results) => {
        if (err) {
            res.status(500).json({ flash: err.message });
        } else {
            res.status(200).json({ flash: "commentaire has been deleted !" });
        }
    });
}

exports.getCommentaireByDate = (req, res, next) => {
    // Récupération des données envoyées
    const date = req.params.date;
    // Connexion à la base de données
    database.query('SELECT * FROM commentaire WHERE date < ? AND is_visible = 1', date, (err, results) => {
        if (err) {
            res.status(500).json({ flash: err.message });
        } else {
            res.status(200).json({ commentaires: results });
        }
    });
}


