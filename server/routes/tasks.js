var express = require('express');
var router = express.Router();
const taskController = require('../controllers/taskController')
const checkLogin = require('../middleware/checkLogin')
const checkOwner = require('../middleware/checkOwner')

//Add New Task
router.post('/add', checkLogin, checkOwner, taskController.addTask)

// //Find All Tasks
router.get('/', checkLogin, taskController.findAll)

// //Update status Task to done
router.put('/:id', checkLogin, checkOwner, taskController.updateTask)

// //Delete task from user
router.delete('/:id', checkLogin, checkOwner, taskController.deleteTask)

module.exports = router;
