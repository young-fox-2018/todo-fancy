var express = require('express');
var router = express.Router();
const TaskController = require('../controllers/task.js');

/* GET tasks listing. */
router.post('/', TaskController.create);
router.get('/', TaskController.read);
router.put('/:TaskId', TaskController.update);
router.delete('/:TaskId', TaskController.delete);

router.get('/detail/:TaskId', TaskController.detail);

module.exports = router;