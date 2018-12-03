const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController.js')
const isLoggedIn = require('../middlewares/isLoggedIn')
 

router.post('/', isLoggedIn, taskController.addNew) 
router.get('/', isLoggedIn, taskController.readAll)
router.get('/pending', isLoggedIn, taskController.readAllPending)
router.get('/done', isLoggedIn, taskController.readAllDone)
router.patch('/:taskID', isLoggedIn, taskController.update)
router.patch('/:taskID/done', isLoggedIn, taskController.markAsDone)
router.delete('/:taskID', isLoggedIn, taskController.delete)

 
module.exports = router
 