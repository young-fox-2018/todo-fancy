const 	express = require('express'),
	router = express.Router(),
	ProjectController = require('../controllers/projectController.js'),
	Middleware = require('../middlewares/index.js');

router.post('/', Middleware.authentication, ProjectController.create);
router.get('/project/:id', Middleware.authentication, ProjectController.readProject);
router.get('/', Middleware.authentication, ProjectController.list);
router.post('/invite', Middleware.authentication, ProjectController.inviteMember);
router.put('/', Middleware.authentication, ProjectController.update);
router.delete('/', Middleware.authentication, ProjectController.delete);
router.patch('/accept', Middleware.authentication, ProjectController.accept);
router.patch('/reject', Middleware.authentication, ProjectController.reject);

module.exports = router;
