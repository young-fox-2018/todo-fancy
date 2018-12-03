var express = require('express');
var router = express.Router();
var user = require('../controllers/userController')

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/login-fb', user.loginFB);

module.exports = router;
