var express = require('express');
var router = express.Router();
const taskController = require('../controllers/taskController')
const auth = require('../middleware/auth')

/* GET users listing. */
router.post('/create', auth.checkLogin, taskController.create)
router.get('/all', auth.checkLogin, taskController.getAll)
//router.post('/update', taskController.update)

module.exports = router;
