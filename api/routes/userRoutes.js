const express = require('express')
const router = express.Router();
const middleware = require('../middleware/middleware')
const userController = require('../controllers/userController')

router.post('/login', userController.login)
router.post('/signup', userController.signup)
router.get('/verifyToken', middleware.checkToken, userController.verifyToken)
router.get('/', middleware.checkToken, userController.getAllUsers)
router.get('/:id', middleware.checkToken, userController.getUserById)
router.put('/:id', middleware.checkToken, userController.updateUser)
router.delete('/:id', middleware.checkToken, userController.deleteUser)
router.get('/:id/commentaires', middleware.checkToken, userController.getCommentairesByUser)
router.get('/verifyConnection/:id', middleware.checkToken, userController.isConnected)

module.exports = router