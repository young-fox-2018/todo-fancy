var express = require('express');
var router = express.Router();
const {signup,signinEmail,signinFacebook,signout} = require('../controllers/userController.js')

/* GET users listing. */
router
      .post('/signinFacebook',signinFacebook)
      .post('/signinEmail',signinEmail)
      .post('/signup',signup)
      .get('/signout',signout)

module.exports = router;
