var express = require('express');
var router = express.Router();
const Controller = require('../controllers/invite')
const Middleware = require('../middleware/index')


router.post('/', Middleware.checkUser, Middleware.checkLogin, Controller.invite)
router.get('/', Middleware.checkUser, Middleware.checkLogin, Controller.readInvite)
router.post('/accept', Middleware.checkUser, Middleware.checkLogin, Controller.accept)
router.post('/reject', Controller.reject)

module.exports = router