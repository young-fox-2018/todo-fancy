const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')

router.post('/create', taskController.createTask)
router.get('/findAllTask', taskController.findAll)
router.post('/findUserTask', taskController.findUserTask)
router.delete('/', taskController.deleteTask)
router.put('/', taskController.updateTask) 

module.exports = router;
