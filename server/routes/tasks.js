var express = require('express');
var router = express.Router();
var taskController = require('../controllers/taskController')
var {loginCheck} = require('../middleware/loginCheck')

router.get('/', loginCheck, taskController.all);
router.post('/', loginCheck, taskController.create)
router.get('/findOne/:taskId', loginCheck, taskController.findOne)
router.put('/:taskId', loginCheck, taskController.update)
router.delete('/:taskId', loginCheck, taskController.delete)

module.exports = router;