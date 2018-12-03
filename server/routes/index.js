var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index')
var userController = require('../controllers/user')

/* GET home page. */
router.post('/login', indexController.login);
router.post('/register', indexController.register);

module.exports = router;
