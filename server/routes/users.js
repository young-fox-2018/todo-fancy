var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');

/* GET users listing. */
router.get('/', UserController.getUser);
router.post('/register', UserController.createUser);
router.post('/login', UserController.userLogin);
router.post('/loginfb', UserController.fbSignIn);
router.delete('/', UserController.deleteUser);

module.exports = router;
