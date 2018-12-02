const router = require('express').Router()
const todoController = require('../controllers/todo')
const { filterReqBody, filterReqQuery, authentication } = require('../middlewares')

router.post('/', authentication, filterReqBody, todoController.create);
router.get('/', authentication, filterReqQuery, todoController.read);
router.patch('/', authentication, filterReqQuery, filterReqBody, todoController.update);
router.delete('/', authentication, filterReqQuery, todoController.delete);

module.exports = router;
