const express = require('express')
const router = express.Router()
const LoginFbController = require('../controllers/fbLoginController')

router.post('/', LoginFbController.loginFb)

module.exports = router