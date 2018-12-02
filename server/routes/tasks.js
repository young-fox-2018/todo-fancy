var express = require('express');
var router = express.Router();
const {newTask, delTask, updTask} = require('../controllers/taskController')

/* GET users listing. */
router.post('/', newTask);
router.delete('/', delTask);
router.patch('/', updTask)

module.exports = router;
