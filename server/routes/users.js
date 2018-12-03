const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const isLoggedIn = require('../middlewares/isLoggedIn')
const isMember = require('../middlewares/isMember')
 

router.get('/allUsers', isLoggedIn, userController.readAll)
router.get('/invite', isLoggedIn, userController.seeInvitation) 
router.patch('/invite/:projectID/:userID', isLoggedIn, isMember, userController.sendInvitation) 
router.patch('/approve/:projectID', isLoggedIn, userController.approveInvitation)
router.patch('/reject/:projectID', isLoggedIn, userController.rejectInvitation)

module.exports = router;
