var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.js');

/* GET users listing. */
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/token-check/:token', UserController.tokenCheck);

module.exports = router;
