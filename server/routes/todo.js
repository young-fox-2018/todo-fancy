const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const { isLogin } = require('../middlewares/isLogin')


router.post('/add', isLogin, TodoController.add)
router.get('/', isLogin, TodoController.read)
router.get('/:todoId', TodoController.detail)

router.put('/update/:todoId', isLogin, TodoController.update)
router.delete('/delete/:todoId', isLogin, TodoController.delete)
router.put('/complete/:todoId', isLogin, TodoController.complete)



module.exports = router