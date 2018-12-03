var express = require('express');
var router = express.Router();
const taskController = require('../controllers/task')
const isLogin = require('../middlewares/isLogin')
const isOwner = require('../middlewares/isOwner')

router.post('/', isLogin, taskController.create)
router.get('/', isLogin, taskController.findAll)
router.get('/:id', isLogin, isOwner, taskController.show)
router.put('/:id', isLogin, isOwner, taskController.update)
router.delete('/:id', isLogin, isOwner, taskController.destroy)


module.exports = router