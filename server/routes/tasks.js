var express = require('express');
var router = express.Router();
const tasksController = require("../controllers/tasks")

/* GET users listing. */
router.get('/', tasksController.all);

router.post('/', tasksController.create);

router.delete('/:id', tasksController.delete);

router.put('/:id', tasksController.update);

module.exports = router;