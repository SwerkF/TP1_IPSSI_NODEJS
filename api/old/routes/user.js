const database = require('../database/database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

module.exports = {
    // CRUD USER

    // Create
    create: (req, res) => {
        // Récupération des données envoyées
        const user = req.body;
        console.log(user)
        // Cryptage du mot de passe
        bcrypt.hash(user.motdepasse, 10, function(err, hash) {
            // Stockage du mot de passe crypté
            user.motdepasse = hash;
            // Connexion à la base de données
            database.query('INSERT INTO utilisateur SET ?', user, (err, results) => {
                if (err) {
                    res.status(500).json({error: err.message});
                } else {
                    res.status(200).json({ flash: "User has been signed up !" });
                }
            });
        });
    },

    login: (req, res) => {
        // Récupération des données envoyées
        const user = req.body;
        // Connexion à la base de données
        database.query('SELECT * FROM utilisateur WHERE email = ?', user.email, (err, results) => {
            if (err) {
                res.status(500).json({error: err.message});
            } else {
                if (results.length > 0) {
                    // Comparaison du mot de passe envoyé avec le mot de passe stocké
                    bcrypt.compare(user.password, results[0].motdepasse, (errBcrypt, resBcrypt) => {
                        if (resBcrypt) {
                            // Création du token
                            let id = results[0].id;
                            token = jwt.sign(
                                { userId: id},
                                process.env.TOKENSECRET,
                                { expiresIn: '15min' }
                            );

                            // Stockage du token dans la base de données
                            database.query('UPDATE utilisateur SET token = ? WHERE id = ?', [token, id], (err, results) => {
                                if (err) {
                                    res.status(500).json({error: err.message});
                                } else {
                                    res.status(200).json({
                                        token: token
                                    });
                                }
                            });
                        } else {
                            res.status(403).json({ error: "Invalid password" });
                        }
                    });
                } else {
                    res.status(404).json({ error: "User not found" });
                }
            }
        });
    },

    // GetAll
    getAll: (req, res) => {
        // connexion à la base de données
        database.query('SELECT * FROM utilisateur', (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ users: results });
            }
        });
    },

    // GetOne
    getById: (req, res) => {
        // Récupération des données envoyées
        const idUser = req.params.id;
        // Connexion à la base de données
        database.query('SELECT * FROM utilisateur WHERE id = ?', idUser, (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ user: results[0] });
            }
        });
    },

    // Update
    update: (req, res) => {
        // Récupération des données envoyées
        const idUser = req.params.id;
        const user = req.body;
        // Connexion à la base de données
        database.query('UPDATE utilisateur SET ? WHERE id = ?', [user, idUser], (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ flash: "User has been updated !" });
            }
        });
    },

    // Delete
    delete: (req, res) => {
        // Récupération des données envoyées
        const idUser = req.params.id;
        // Connexion à la base de données
        database.query('DELETE FROM utilisateur WHERE id = ?', idUser, (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                res.status(200).json({ flash: "User has been deleted !" });
            }
        });
    },

    // Récupérer les commentaires d'un utilisateur
    getCommentaires: (req, res) => {
        // Récupération des données envoyées
        const idUser = req.params.id;
        // Connexion à la base de données
        database.query('SELECT * FROM commentaire WHERE utilisateur_id = ?', idUser, (err, results) => {
            if (err) {
                res.status(500).json({ flash: err.message });
            } else {
                console.log(results);
                res.status(200).json({ commentaires: results });
            }
        });
    },

    // Vérification connexion

    checkToken: (req, res) => {
        // Récupération des données envoyées
        const token = req.body.token;
        // Connexion à la base de données
        database.query('SELECT * FROM utilisateur WHERE token = ?', token, (err, results) => {
            if (err) {
                res.status(500).json({error: err.message});
            } else {
                if (results.length > 0) {
                    // Check token
                    jwt.verify(token, process.env.TOKENSECRET, function(err, decoded) {
                        if (err) {
                            res.status(403).json({ error: "Invalid token" });
                        } else {
                            res.status(200).json({ message: "Valid token" });
                        }
                    });
                } else {
                    res.status(404).json({ error: "User not found" });
                }
            }
        });
    },

    isConnected: (req, res) => {
        // Récupérer l'id de l'utilisateur connecté
        const idUser = req.params.id;
        // Connexion à la base de données
        database.query('SELECT * FROM utilisateur WHERE id = ?', idUser, (err, results) => {
            if (err) {
                res.status(500).json({error: err.message});
            } else {
                if (results.length > 0) {
                    // Check token
                    jwt.verify(results[0].token, process.env.TOKENSECRET, function(err, decoded) {
                        if (err) {
                            res.status(403).json({ error: "Déconnecté" });
                        } else {
                            res.status(200).json({ message: "Connecté" });
                        }
                    });
                } else {
                    res.status(404).json({ error: "User not found" });
                }
            }
        });
    }
    
}