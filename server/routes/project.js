var express = require('express');
var router = express.Router();
const ProjectController = require('../controllers/project.js');
const {isAuth} = require('../middlewares/isAuth.js');

/* GET Projects listing. */
router.post('/', isAuth, ProjectController.create);
router.get('/', isAuth, ProjectController.read);

module.exports = router;