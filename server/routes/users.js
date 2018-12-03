var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')
const isLogin = require('../middlewares/isLogin')

/* GET users listing. */
router.get('/', isLogin, userController.findAll);
router.patch('/:userId/:projectId', isLogin, userController.inviteProject)

module.exports = router;
