const router = require('express').Router()

const { gSignIn, facebook, register, login, read } = require('../controllers/controller-user')
const Multer = require('multer')

const upload = Multer({ storage : Multer.memoryStorage()})


router.get('/', read)
router.post('/login-facebook', facebook)
router.post('/register', register)
router.post('/login', login)




module.exports = router