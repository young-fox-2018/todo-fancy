const router = require('express').Router()

//controller
const { read, create, findById } = require('../controllers/controller-group')

//midleware
const { isLogin, isTokenStillValid, isAuthorize} = require('../midleware/authenticate')

router.get('/',isLogin,isTokenStillValid, read )
router.get('/:id',isLogin,isTokenStillValid, findById )
router.post('/',isLogin, isTokenStillValid, create)

module.exports = router