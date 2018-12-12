var express = require('express');
var router = express.Router();
const taskController = require("../controllers/taskController")

/* GET all task list. */
router.get('/all', taskController.readAll);
/* GET one task */ 
router.get('/one', taskController.read);
/* Create a task list */ 
router.post('/', taskController.create)
/* Delete a task list*/
router.delete('/', taskController.delete)
/* Update a task */
router.put('/', taskController.update)

module.exports = router