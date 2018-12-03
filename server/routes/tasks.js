var express = require('express');
var router = express.Router();
const taskController = require('../controllers/taskController')
const auth = require('../middleware/auth')

/* GET users listing. */
router.put('/', auth.checkLogin, taskController.update)
router.post('/create', auth.checkLogin, taskController.create)
router.get('/all', auth.checkLogin, taskController.getAll)
router.get('/:taskId', auth.checkLogin, taskController.getDetail)
router.post('/finish', auth.checkLogin, taskController.finishTask)
router.delete('/delete', auth.checkLogin, taskController.delete)
//router.post('/update', taskController.update)

module.exports = router;
