const Todo = require('../models/todo')
const Project = require('../models/project')

function isAuthorized (req, res, next) {
    Todo
        .findOne({
            _id: req.params.id
        })
        .then(todo => {
            if(String(todo.user) === String(req.currentUserId)) {
                next()
            } else if(todo.project) {
                //check if user is part of the member
                return Project
                        .findOne({
                            _id: todo.project
                        })
                        .then(project => {
                            project.members.forEach(element => {
                                if(String(element) == req.currentUserId) {
                                    next()
                                }
                            });
                        })
            } else {
                res.status(400).json({message: "You are not authorized to modify this Todo"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({message:"Todo does not exist", note: "Please see console for details"})
        })
}

module.exports = isAuthorized