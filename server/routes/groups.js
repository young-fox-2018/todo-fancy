const express = require('express')
const router = express.Router()
const GroupController = require('../controllers/groupController')
const Auth = require('../middlewares/auth')
const TaskController = require('../controllers/taskController')

router.get('/:groupId', Auth.isLogin, Auth.isMember, TaskController.showAllGroupTask)
router.post('/', Auth.isLogin, GroupController.create)
router.post('/:groupId/invite', Auth.isLogin, Auth.isMember, GroupController.invite)
router.post('/:groupId', Auth.isLogin, Auth.isMember, TaskController.createTaskToGroup)
router.put('/:groupId/:id', Auth.isLogin, Auth.isMember, TaskController.update)
module.exports = router
