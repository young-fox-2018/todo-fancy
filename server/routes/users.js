var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

router.post('/register', userController.register);
router.post('/login', userController.login)
router.post('/addProject', userController.addProject)
router.post('/inviteProject', userController.inviteProject)
router.post('/findByEmail', userController.findByEmail)

module.exports = router;
