var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController')
const LoginFbController = require('../controllers/fbLoginController')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// })

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/loginFb', LoginFbController.loginFb)



module.exports = router;
