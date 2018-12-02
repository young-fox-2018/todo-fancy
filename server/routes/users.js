var express = require('express');
var router = express.Router();
const userController = require('../controller/user.js')

/* GET users listing. */
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/loginFB', userController.loginFB)

module.exports = router;
