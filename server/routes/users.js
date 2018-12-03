var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')
const {loginAuth} = require('../Middlewares/loginAuth')


/* GET users listing. */
router.post('/',loginAuth, userController.findOne);
router.put('/:id',loginAuth, userController.update);
router.delete('/:id',loginAuth, userController.delete);


module.exports = router;
