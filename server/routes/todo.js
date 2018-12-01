var express = require('express');
var router = express.Router();
const todoController = require('../controller/todo.js')

/* GET users listing. */
router.post('/', todoController.create)
router.get('/', todoController.readAll)
router.put('/', todoController.update)
router.delete('/', todoController.delete)

module.exports = router;