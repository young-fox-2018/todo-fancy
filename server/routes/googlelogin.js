const express = require('express')
const router = express.Router()
const googleloginController = require('../controllers/googleloginController')

router.post('/', googleloginController.login)

module.exports = router