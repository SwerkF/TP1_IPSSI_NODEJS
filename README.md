# TP IPSSI

L'application front permet de se connecter, se déconnecter, ajouter et supprimer une technologie.

Pour ajouter un commentaire il faut se rendre dans la page technologie et sur un techno, il faut être connecté en admin ou journaliste pour le faire.

Liste des routes d'API:

# Users routes
## Login
- POST /api/login

## Signup
- POST /api/signup

## Récupérer tous les utilisateurs
- GET /api/users

## Récupérer un utilisateur via son id
- GET /api/users/:id

## Modifier un utilisateur via son id
- PUT /api/users/:id

## Supprimer un utilisateur via son id
- DELETE /api/users/:id

## Récupérer les commentaires d'un utilisateur
- GET /api/users/:id/commentaires

## Vérifier le token d'un utilisateur
- POST /api/users/verifyToken

## Vérifier la connexion d'un utilisateur
- GET /api/users/verifyConnection/:id

# Commentaire routes
## Récupérer tous les commentaires
- GET /api/commentaires

## Récupérer un commentaire via son id
- GET /api/commentaires/:id

## Créer un commentaire
- POST /api/commentaires

## Modifier un commentaire via son id
- PUT /api/commentaires/:id

## Supprimer un commentaire via son id
- DELETE /api/commentaires/:id

## Récupérer les commentaires antérieur à une date
- GET /api/commentaires/date/:date

# Technologie routes
## Récupérer toutes les technologies
- GET /api/technologies

## Récupérer une technologie via son id
- GET /api/technologies/:id

## Créer une technologie
- POST /api/technologies

## Modifier une technologie via son id
- PUT /api/technologies/:id

## Supprimer une technologie via son id
- DELETE /api/technologies/:id

## Récupérer les commentaires d'une technologie
- GET /api/technologies/:id/commentaires
