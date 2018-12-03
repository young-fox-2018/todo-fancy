var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todo')

/* GET users listing. */
router.post('/', todoController.create);
router.get('/', todoController.findAll);
router.put('/', todoController.update);
router.delete('/', todoController.delete);
router.get('/:id', todoController.findOne)

module.exports = router;
