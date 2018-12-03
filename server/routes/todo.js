const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const { isLogin, isOwner } = require('../middlewares/auth')


router.post('/add', isLogin, TodoController.add)
router.get('/', isLogin, TodoController.read)
router.get('/:todoId', TodoController.detail)

router.put('/update/:todoId', isLogin, isOwner, TodoController.update)
router.delete('/delete/:todoId', isLogin, isOwner, TodoController.delete)
router.put('/complete/:todoId', isLogin, isOwner, TodoController.complete)



module.exports = router