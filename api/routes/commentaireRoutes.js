const express = require('express')
const router = express.Router();
const middleware = require('../middleware/middleware')
const commentaireController = require('../controllers/commentaireController')

router.get('/', middleware.checkToken, commentaireController.getAllCommentaires)
router.get('/:id', middleware.checkToken, commentaireController.getCommentaireById)
router.post('/', middleware.checkToken, middleware.isJournalistOrAdmin, commentaireController.createCommentaire)
router.put('/:id', middleware.checkToken, commentaireController.updateCommentaire)
router.delete('/:id', middleware.checkToken, middleware.isAdmin, commentaireController.deleteCommentaire)
router.get('/date/:date', middleware.checkToken, commentaireController.getCommentaireByDate)

module.exports = router