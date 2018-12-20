var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todo')
var {loginAuth} = require('../Middlewares/loginAuth')

/* GET users listing. */
router.post('/',loginAuth, todoController.create);
router.get('/',loginAuth, todoController.findAll);
router.put('/', loginAuth, todoController.update);
router.delete('/', loginAuth, todoController.delete);
router.get('/:id', loginAuth, todoController.findOne)

module.exports = router;
