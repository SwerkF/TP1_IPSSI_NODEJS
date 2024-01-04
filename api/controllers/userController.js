const database = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getAllUsers = (req, res, next) => {
    // Connexion à la base de données
    database.query('SELECT * FROM utilisateur', (err, results) => {
        if (err) {
            res.status(500).json({ flash: err.message });
        } else {
            res.status(200).json({ users: results });
        }
    });
}

exports.signup = (req, res, next) => {
    // Récupération des données envoyées
    console.log(req.body)
    const user = req.body;
    // Cryptage du mot de passe
    bcrypt.hash(user.motdepasse, 10, (err, encryptedPassword) => {
        if (err) {
            res.status(500).json({ flash: err.message });
        } else {
            console.log(req.body)
            user.motdepasse = encryptedPassword;
            // Connexion à la base de données
            database.query('INSERT INTO utilisateur SET ?', user, (err, results) => {
                // Créer le token
                if (err) {
                    res.status(500).json({ flash: err.message });
                } else {
                    const token = jwt.sign(
                        { email: user.email },
                        process.env.TOKENSECRET,
                        { expiresIn: "24h" }
                    );
                    res.status(200).json({ flash: "User has been created !", token: token });
                }
            });
        }
    });
}

exports.login = (req, res, next) => {
    // Récupération des données envoyées
    console.log(req.body)
    const user = req.body;
    // Connexion à la base de données
    database.query('SELECT * FROM utilisateur WHERE email = ?', user.email, (err, results) => {
        if (err) {
            res.status(500).json({ flash: err.message });
        } else if (results.length === 0) {
            res.status(401).json({ flash: "User not found !" });
        } else {
            // Comparaison du mot de passe envoyé avec celui en base
            bcrypt.compare(user.password, results[0].motdepasse, (err, same) => {
                if (err) {
                    res.status(500).json({ flash: err.message });
                } else if (!same) {
                    res.status(401).json({ flash: "Wrong password !" });
                } else {
                    const token = jwt.sign(
                        { email: results[0].email },
                        process.env.TOKENSECRET,
                        { expiresIn: "24h" }
                    );
                    res.status(200).json({ flash: "User connected !", token: token });
                }
            });
        }
    });
}

exports.getUserById = (req, res, next) => {
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
}

exports.updateUser = (req, res, next) => {
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
}

exports.deleteUser = (req, res, next) => {
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
}

exports.getCommentairesByUser = (req, res, next) => {
    // Récupération des données envoyées
    const idUser = req.params.id;
    // Connexion à la base de données
    database.query('SELECT * FROM commentaire WHERE utilisateur_id = ?', idUser, (err, results) => {
        if (err) {
            res.status(500).json({ flash: err.message });
        } else {
            res.status(200).json({ commentaires: results });
        }
    });
}

exports.verifyToken = (req, res, next) => {
    // Récupération du token dans le header
    const token = req.headers.authorization.split(" ")[1];
    // Vérification du token
    jwt.verify(token, process.env.TOKENSECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ flash: "Invalid token !" });
        } else {
            const emailUser = decodedToken.email;
            // Connexion à la base de données
            database.query('SELECT utilisateur.id as id, email, utilisateur.nom, prenom, role.nom as role FROM utilisateur INNER JOIN role ON role.id = role_id WHERE email = ?', emailUser, (err, results) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ flash: err.message });
                } else {
                    res.status(200).json({ user: results[0] });
                }
            });
        }
    });
}

exports.isConnected = (req, res, next) => {
    // Récupération du token dans le header
    const token = req.headers.authorization.split(" ")[1];
    // Vérification du token
    jwt.verify(token, process.env.TOKENSECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ flash: "Invalid token !" });
        } else {
            res.status(200).json({ flash: "Valid token !" });
        }
    });
}

exports.getUserRole = (req, res, next) => {
    // Récupération du token dans le header
    const token = req.headers.authorization.split(" ")[1];
    // Vérification du token
    jwt.verify(token, process.env.TOKENSECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ flash: "Invalid token !" });
        } else {
            // Récupération des données envoyées
            const emailUser = decodedToken.email;
            // Connexion à la base de données
            database.query('SELECT * FROM utilisateur INNER JOIN role ON role.id = role_id WHERE email = ? AND is_visible = 1', emailUser, (err, results) => {
                if (err) {
                    res.status(500).json({ flash: err.message });
                } else {
                    res.status(200).json({ role: results[0].nom });
                }
            });
        }
    });
}
