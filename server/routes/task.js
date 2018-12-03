const   express = require('express'),
        router = express.Router(),
	TaskController = require('../controllers/taskController.js'),
        Middleware = require('../middlewares/index.js');

router.post('/', Middleware.authentication, TaskController.create);
router.get('/', Middleware.authentication, TaskController.read);
router.get('/:id', Middleware.authentication, Middleware.authorization, TaskController.readOne);
router.get('/project/:id', Middleware.authentication, Middleware.authorizationProjectMember, TaskController.readOne);
router.put('/:id', Middleware.authentication, Middleware.authorization, TaskController.update);
router.put('/project/:id', Middleware.authentication, Middleware.authorizationProjectMember, TaskController.update);
router.patch('/:id', Middleware.authentication, Middleware.authorization, TaskController.changeStatus);
router.patch('/project/:id', Middleware.authentication, Middleware.authorizationProjectMember, TaskController.changeStatus);
router.delete('/:id', Middleware.authentication, Middleware.authorization, TaskController.delete);


module.exports = router;
