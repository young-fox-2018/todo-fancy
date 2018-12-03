const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController')
const isLoggedIn = require('../middlewares/isLoggedIn')
const isMember = require('../middlewares/isMember')

router.post('/', isLoggedIn, ProjectController.addNew) 
router.get('/', isLoggedIn, ProjectController.readAll)
router.post('/:projectID/addTask', isLoggedIn, isMember, ProjectController.addTask) 
router.patch('/:projectID/:taskID', isLoggedIn, isMember, ProjectController.updateTask)
router.get('/:projectID', isLoggedIn, isMember, ProjectController.readAllTasks)

 
module.exports = router
