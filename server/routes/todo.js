const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

router.post('/create', todoController.create)
router.post('/findAll', todoController.findAll),
router.post('/findOne', todoController.findByActivity)
router.put('/:id', todoController.update)
router.delete('/:id', todoController.delete)
router.post('/findById', todoController.findById)

module.exports = router