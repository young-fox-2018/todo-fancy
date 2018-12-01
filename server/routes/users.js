var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController')
const Auth = require('../middlewares/auth')
//const Auth = require('../middlewares/auth')

router.post('/googleSignIn', Auth.googleValidation, UserController.registerWithGoogle, UserController.loginWithGoogle)
router.post('/', UserController.create)
router.post('/login', UserController.login)
router.get('/invitation', Auth.isLogin, UserController.showInvitation)
router.get('/groups', Auth.isLogin, UserController.showGroup)
router.patch('/invitation/:id', Auth.isLogin, Auth.isInvitationOwner, UserController.changeInvitationStatus)

module.exports = router;
