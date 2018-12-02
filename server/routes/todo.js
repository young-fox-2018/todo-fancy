const router = require('express').Router()
const Controller = require('../controllers/todo')
const isLogin = require('../middlewares/isLogin')
const isAuthorized = require('../middlewares/isAuthorized')
const isDateValid = require('../middlewares/isDateValid')

router.post('/', isLogin, isDateValid , Controller.addTask)
router.get('/', isLogin, Controller.getTask)
router.delete('/:id', isLogin, isAuthorized, Controller.deleteTask)
router.put('/:id', isLogin, isAuthorized, isDateValid, Controller.editTask)

module.exports = router