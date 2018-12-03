var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')

/* GET users listing. */
router.post('/', userController.findOne);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);


module.exports = router;
