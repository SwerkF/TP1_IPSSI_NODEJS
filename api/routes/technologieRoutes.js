const express = require('express')
const router = express.Router();
const middleware = require('../middleware/middleware')
const technologieController = require('../controllers/technologieController')

router.get('/', middleware.checkToken, technologieController.getAllTechnologies)
router.get('/:id', middleware.checkToken, technologieController.getTechnologieById)
router.post('/', middleware.checkToken, middleware.isAdmin, technologieController.createTechnologie)
router.put('/:id', middleware.checkToken, middleware.isAdmin, technologieController.updateTechnologie)
router.delete('/:id', middleware.checkToken, middleware.isAdmin, technologieController.deleteTechnologie)
router.get('/:id/commentaires', middleware.checkToken, technologieController.getTechnologieCommentaire)

module.exports = router