var express = require('express');
var router = express.Router();
const Controller = require('../controllers/group')
const Middleware = require('../middleware/index')

router.post('/create', Middleware.checkUser, Middleware.checkLogin, Controller.create)
router.post('/create-task', Middleware.checkUser, Middleware.checkLogin, Controller.createTask)
router.post('/delete-task', Controller.deleteTask)
router.post('/find-task', Controller.findTask)
router.put('/update-task', Controller.updateTask)
router.post('/complete', Controller.completeTask)
router.get('/', Middleware.checkUser, Middleware.checkLogin, Controller.readGroup)
router.post('/', Middleware.checkUser, Middleware.checkLogin, Controller.readGroupTask)



module.exports = router