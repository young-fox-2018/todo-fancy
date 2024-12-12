var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users")

/* GET users listing. */
router.get('/', usersController.all);

router.get('/:id', usersController.find);

router.post('/', usersController.create);

router.post('/signIn', usersController.signIn);

router.post('/checkToken', usersController.checkToken);

router.post("/fbSignin", usersController.fbSignin)

module.exports = router;
