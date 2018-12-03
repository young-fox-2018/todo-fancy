var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
router.post('/', userController.verifyToken);
router.get('/', userController.gLogin);


module.exports = router;
