const express = require('express');
const router = express.Router();
const taskController =  require('../controllers/taskController')
const islogin = require('../middlewares/islogin')
const authorization = require('../middlewares/authorization')

/* GET users listing. */
router.post('/', islogin, taskController.addTask);
router.get('/',islogin, taskController.showAll)
router.delete('/:taskid', islogin, authorization, taskController.delete)
router.put('/:taskid', islogin, authorization, taskController.update)

module.exports = router;
