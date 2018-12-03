const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController');

/* GET home page. */
// router.get('/', TodoController.getAllTodos);
router.post('/', TodoController.createTodo);
router.delete('/:idTodo', TodoController.deleteTodo);
router.put('/:idTodo', TodoController.updateTodo);

module.exports = router;
