const express = require('express');
const router = express.Router();
const userController =  require('../controllers/userController')

/* GET users listing. */
router.post('/register', userController.newUser )
router.post('/login', userController.loginEmail)


module.exports = router;
