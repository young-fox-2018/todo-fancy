const router = require('express').Router()
const Controller = require('../controllers/user')

router.get('/', Controller.viewUsers)

module.exports = router