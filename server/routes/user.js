var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.js');
const {isAuth} = require('../middlewares/isAuth.js');

/* GET users listing. */
router.get('/', isAuth, UserController.read);

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/token-check/:token', UserController.tokenCheck);
router.get('/verify-facebook/:tokenFacebook', UserController.verifyFacebook);


module.exports = router;
