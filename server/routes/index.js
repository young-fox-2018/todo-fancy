var express = require('express');
var router = express.Router();
const Users = require("./users")
const Tasks = require("./tasks")

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.status(200).json({
    msg: "succes running"
  })
});
router.use("/users", Users)
router.use("/tasks", Tasks)


module.exports = router;
