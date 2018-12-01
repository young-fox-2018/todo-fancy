const express = require('express');
const router = express.Router();
//const UserController = require('../controllers/userController')
const TaskController = require('../controllers/taskController')
const Auth = require('../middlewares/auth')

//router.post('/', Auth.isLogin, TaskController.create)
// router.post('/login', UserController.login)
router.post('/', Auth.isLogin, TaskController.create)
router.get('/', Auth.isLogin, TaskController.showAll)
router.delete('/:id', Auth.isLogin, Auth.isOwner, TaskController.delete)
router.put('/:id', Auth.isLogin, Auth.isOwner, TaskController.update)
module.exports = router;
