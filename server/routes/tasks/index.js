var express = require('express');
var router = express.Router();
const taskController = require("../../controllers/task")
const { isLogin } = require("../../midlleware/isLogin")

router.post("/add", isLogin, taskController.addTask)
router.put("/update", isLogin, taskController.updateTask)
router.put("/status", isLogin, taskController.updateStatus)
router.put("/priority", isLogin, taskController.updatePriority)
router.get("/priority", isLogin, taskController.findPriority)
router.delete("/", isLogin, taskController.deleteTask)
router.get("/", isLogin, taskController.findTask)

module.exports = router



