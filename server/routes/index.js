var express = require('express');
var router = express.Router();
const {signUp, signIn, FBUser} = require('../controllers/userController')

/* GET home page. */
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/loginFB', FBUser)
module.exports = router;
