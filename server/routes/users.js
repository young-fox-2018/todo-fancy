var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var {authorization} = require('../middleware/authorization')

// router.get('/', userController.all)
router.post('/signup', userController.signup)
router.post('/signin', authorization, userController.signin)
// router.put('/:userId', userController.update)
// router.delete('/:userId', userController.delete)

module.exports = router;
