const router = require('express').Router()
const Controller = require('../controllers/project')
const isLogin = require('../middlewares/isLogin')
const inviteeExist = require('../middlewares/inviteeExist')
const inviteValid = require('../middlewares/inviteValid')
const isinvitationValid = require('../middlewares/isinvitationValid')

router.post('/', isLogin, Controller.createProject)
router.get('/', isLogin, Controller.viewProjects)
router.get('/invitation', isLogin, Controller.viewInvitations)
router.post('/invite', isLogin, inviteeExist, inviteValid, Controller.invite)
router.post('/accept/:invitationId', isLogin, isinvitationValid, Controller.accept)
router.get('/:projectId', isLogin, Controller.viewProjectTodo)

module.exports = router