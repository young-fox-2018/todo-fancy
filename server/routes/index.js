var express = require('express');
var router = express.Router();
const controller   = require('../controllers/taskController.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/new",controller.findall)
module.exports = router;
