var express = require('express')
var user = require('./routes/user')
var commentaire = require('./routes/commentaire')
var technologie = require('./routes/technologie')

exports.router = (function () {

    var apiRouter = express.Router();

    // Users routes
    // Login
    apiRouter.route('/login').post(user.login);
    // Signup
    apiRouter.route('/signup').post(user.create);
    // Récupérer tous les utilisateurs
    apiRouter.route('/users').get(user.getAll);
    // Récupérer un utilisateur via son id
    apiRouter.route('/users/:id').get(user.getById);
    // Modifier un utilisateur via son id
    apiRouter.route('/users/:id').put(user.update);
    // Supprimer un utilisateur via son id
    apiRouter.route('/users/:id').delete(user.delete);
    // Récupérer les commentaires d'un utilisateur
    apiRouter.route('/users/:id/commentaires').get(user.getCommentaires);
    // Vérifier le token d'un utilisateur
    apiRouter.route('/users/verifyToken').post(user.checkToken);
    // Vérifier la connexion d'un utilisateur
    apiRouter.route('/users/verifyConnection/:id').get(user.isConnected);

    // Commentaire routes
    // Récupérer tous les commentaires
    apiRouter.route('/commentaires').get(commentaire.getAll);
    // Récupérer un commentaire via son id
    apiRouter.route('/commentaires/:id').get(commentaire.getById);
    // Créer un commentaire
    apiRouter.route('/commentaires').post(commentaire.create);
    // Modifier un commentaire via son id
    apiRouter.route('/commentaires/:id').put(commentaire.update);
    // Supprimer un commentaire via son id
    apiRouter.route('/commentaires/:id').delete(commentaire.delete);
    // Récupérer les commentaires d'une technologie
    apiRouter.route('/commentaires/date/:date').get(commentaire.getByDate);

    // Technologie routes
    // Récupérer toutes les technologies
    apiRouter.route('/technologies').get(technologie.getAll);
    // Récupérer une technologie via son id
    apiRouter.route('/technologies/:id').get(technologie.getById);
    // Créer une technologie
    apiRouter.route('/technologies').post(technologie.create);
    // Modifier une technologie via son id
    apiRouter.route('/technologies/:id').put(technologie.update);
    // Supprimer une technologie via son id
    apiRouter.route('/technologies/:id').delete(technologie.delete);
    // Récupérer les commentaires d'une technologie
    apiRouter.route('/technologies/:id/commentaires').get(technologie.getCommentaires);
 
    return apiRouter;
})();