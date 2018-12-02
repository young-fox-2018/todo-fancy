var express = require('express');
var router = express.Router();
const {allTask} = require('../controllers/userController')

/* GET home page. */
router.post('/', allTask)


module.exports = router;
