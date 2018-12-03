var express = require('express');
var router = express.Router();
const {createTodo,search, edit, deleteTodo} = require('../controllers/taskController.js')
const authorization = require('../middlewares/authorization.js')

router
      .post('/',authorization,createTodo)
      .get('/',authorization, search)
      .put('/',authorization, edit)
      .delete('/',authorization, deleteTodo)

module.exports = router;
