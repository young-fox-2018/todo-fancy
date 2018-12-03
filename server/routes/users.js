var express = require('express');
var router = express.Router();
const userController = require('../controller/user.js')
const middleware = require('../middleware/middleware')

/* GET users listing. */
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/loginFB', middleware.findOne, userController.loginFB)

module.exports = router;
