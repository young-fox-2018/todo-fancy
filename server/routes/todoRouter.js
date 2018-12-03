var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todoController')
const {authLogin} = require('../middlewares/middleWare')

/* GET users listing. */
router.post('/', authLogin, todoController.create);
router.get('/', authLogin, todoController.readAll);
router.get('/:todoId', authLogin, todoController.readOne);
router.put('/:todoId', authLogin, todoController.update);
router.patch('/finish/:todoId', authLogin, todoController.finished);
router.delete('/:todoId', authLogin, todoController.delete);

module.exports = router;
