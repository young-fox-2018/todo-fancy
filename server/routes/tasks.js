const express = require('express');
const router = express.Router();
const taskController =  require('../controllers/taskController')
const islogin = require('../middlewares/islogin')
const authorization = require('../middlewares/authorization')

/* GET users listing. */
router.post('/add', islogin, taskController.addTask);
router.get('/showall/:userid',islogin, taskController.showAll)
router.get('/delete/:taskid', islogin, authorization, taskController.delete)
router.put('/update/:taskid', islogin, authorization, taskController.update)

module.exports = router;
