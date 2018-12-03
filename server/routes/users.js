var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const checkLogin = require('../middleware/checkLogin')

/* GET users listing. */
router.get('/', userController.findAll)

//User Sign Up
router.post('/signup', userController.signUp)

//User Sign In
router.post('/signin', userController.signIn)



module.exports = router;
