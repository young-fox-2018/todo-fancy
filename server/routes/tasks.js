var express = require('express');
var router = express.Router();
const taskController = require('../controllers/taskController')
const checkLogin = require('../middleware/checkLogin')

//Add New Task
router.post('/add', checkLogin, taskController.addTask)

// //Find All Tasks
router.get('/', checkLogin, taskController.findAll)

// //Update status Task to done
router.put('/:id', checkLogin, taskController.updateTask)

// //Delete task from user
router.delete('/:id', checkLogin, taskController.deleteTask)

module.exports = router;
