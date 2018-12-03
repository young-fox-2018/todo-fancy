const router = require('express').Router()
const projectController = require('../controllers/project')
const isLogin = require('../middlewares/isLogin')
const {isInvited, isMember} = require('../middlewares/projectMiddleware')
const taskController = require('../controllers/task')


router.post('/', isLogin, projectController.create)
router.patch('/:id/join', isLogin, isInvited, projectController.join)
router.patch('/:id/add-task', isLogin, isMember, projectController.addTask)
router.get('/:id/tasks', isLogin, isMember, taskController.findProjectTasks)

module.exports = router