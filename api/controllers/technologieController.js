const database = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getAllTechnologies = (req, res, next) => {
    // Connexion à la base de données
    database.query('SELECT * FROM technologie', (err, results) => {
        if (err) {
            res.status(500).json({ flash: err.message });
        } else {
            res.status(200).json({ technologies: results });
        }
    });
}

exports.getTechnologieById = (req, res, next) => {
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
}

exports.createTechnologie = (req, res, next) => {
    // Récupération des données envoyées
    const technologie = req.body;
    // Connexion à la base de données
    database.query('INSERT INTO technologie SET ?', technologie, (err, results) => {
        if (err) {
            res.status(500).json({ flash: err.message });
        } else {
            res.status(200).json({ flash: "technologie has been created !" });
        }
    });
}

exports.updateTechnologie = (req, res, next) => {
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
}

exports.deleteTechnologie = (req, res, next) => {
    // Récupération des données envoyées
    const idTechnologie = req.params.id;
    // delete commentaires 
    database.query('DELETE FROM commentaire WHERE technologie_id = ?', idTechnologie, (err, results) => {
        if (err) {
            res.status(500).json({ flash: err.message });
        } else {
            // delete technologie
            database.query('DELETE FROM technologie WHERE id = ?', idTechnologie, (err, results) => {
                if (err) {
                    res.status(500).json({ flash: err.message });
                } else {
                    res.status(200).json({ flash: "technologie has been deleted !" });
                }
            });
        }
    });
    
}

exports.getTechnologieCommentaire = (req, res, next) => {
    // Récupération des données envoyées
    const idTechnologie = req.params.id;
    // Connexion à la base de données
    database.query('SELECT commentaire.id, commentaire, utilisateur.nom as nom, utilisateur.prenom as prenom, date_creation FROM commentaire INNER JOIN utilisateur ON utilisateur_id = utilisateur.id WHERE technologie_id = ? AND is_visible = 1', idTechnologie, (err, results) => {
        if (err) {
            res.status(500).json({ flash: err.message });
        } else {
            res.status(200).json({ commentaires: results });
        }
    });
}
