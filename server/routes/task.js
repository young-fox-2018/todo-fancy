var express = require('express');
var router = express.Router();
const TaskController = require('../controllers/task.js');
const {isAuth} = require('../middlewares/isAuth.js');

/* GET tasks listing. */
router.post('/', isAuth, TaskController.create);
router.get('/', isAuth, TaskController.read);
router.put('/:TaskId', TaskController.update);
router.delete('/:TaskId', TaskController.delete);

router.get('/detail/:TaskId', TaskController.detail);
router.post('/projects', isAuth, TaskController.createTaskProject);

module.exports = router;