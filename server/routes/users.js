const router = require('express').Router()
const userController = require('../controllers/user')
const { filterReqBody, filterReqQuery, authentication } = require('../middlewares')

router.post('/signup', filterReqBody, userController.signUp);
router.post('/signin', userController.signIn);
router.get('/', authentication ,userController.read);
router.patch('/', authentication, filterReqBody, userController.update);
router.delete('/', authentication, userController.delete);

module.exports = router;
