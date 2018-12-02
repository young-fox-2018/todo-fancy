const router = require('express').Router()
const Controller = require('../controllers/registeration')
const isUserExist = require('../middlewares/isUserExist')
const getFbData = require('../middlewares/getFBData')

router.post('/signup', Controller.signup)
router.post('/signin', isUserExist, Controller.signin)
router.post('/fb-signin', getFbData, Controller.FBsignin)

module.exports = router