const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')

router.post('/create', projectController.create)
router.put('/addActivity/:id', projectController.updateActivity)
router.put('/updateUser/:id', projectController.updateUser)
router.post('/find', projectController.find)
router.post('/findMember', projectController.findMember)

module.exports = router