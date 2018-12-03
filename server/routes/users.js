var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController")

/* GET all user. */
// router.get('/',);
/* Create a  user */ 
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)

/* Delete a  user*/
// router.delete('/',)
/* Update a  */
// router.put('/',)

module.exports = router;