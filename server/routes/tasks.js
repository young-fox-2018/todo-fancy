var express = require('express');
var router = express.Router();
const {newTask, delTask, finTask} = require('../controllers/taskController')

/* GET users listing. */
router.post('/', newTask);
router.delete('/', delTask);
router.patch('/', finTask)

module.exports = router;
