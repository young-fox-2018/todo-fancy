var express = require('express');
var router = express.Router();
const ProjectController = require('../controllers/project.js');
const {isAuth} = require('../middlewares/isAuth.js');

/* GET Projects listing. */
router.post('/', isAuth, ProjectController.create);
router.get('/', isAuth, ProjectController.read);
router.post('/add-member', isAuth, ProjectController.addMember);
router.get('/get-tasks-projects/:ProjectId', isAuth, ProjectController.getTaskProject);

module.exports = router;