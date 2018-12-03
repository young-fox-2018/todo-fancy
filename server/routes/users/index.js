var express = require('express');
var router = express.Router();
const UserController = require("../../controllers/user")
const { isLogin } = require("../../midlleware/isLogin")


router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/", isLogin, UserController.isLogin)
router.get("/fblogin?", UserController.fblogin)

module.exports = router