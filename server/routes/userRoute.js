const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.post('/create', userController.createUser)
router.post('/login', userController.login)
router.post('/facebooklogin', userController.facebookLogin)

module.exports = router;
