var express = require('express');
var router = express.Router();
const todoController = require('../controller/todo.js')
const middleware = require('../middleware/middleware')

/* GET users listing. */
router.post('/', middleware.decode, middleware.findOne, todoController.create)
router.get('/', middleware.decode, middleware.findOne, todoController.readAll)
router.put('/:id', todoController.update)
router.delete('/', todoController.delete)

module.exports = router;