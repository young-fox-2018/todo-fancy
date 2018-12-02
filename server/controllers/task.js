const Task = require('../models/task.js');
const Project = require('../models/project.js');

class TaskController {

    static create(req, res) {
        Task.create({
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.user.UserId,
        })
            .then(function(newTask) {
                res.status(201).json(newTask);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    static createTaskProject(req, res) {
        Task.create({
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.user.UserId,
            isProject: 1,
        })
            .then(function(newTask) {
                Project.update(
                    {_id: req.body.ProjectId},
                    {
                        $push: {
                            tasks: newTask._id,
                        },
                    },
                )
                    .then(function(result) {
                        res.status(200).json(result);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    static read(req, res) {
        Task.find({})
            .sort({due_date: 'desc'})
            .where({
                UserId: req.user.UserId,
                isProject: 0,
            })
            .then(function(dataTask) {
                res.status(200).json(dataTask);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    static update(req, res) {
        Task.update(
            {_id: req.params.TaskId},
            {
                name: req.body.name,
                description: req.body.description,
                due_date: req.body.due_date,
            },
        )
            .then(function(result) {
                res.status(201).json(result);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    static delete(req, res) {
        Task.findByIdAndDelete({_id: req.params.TaskId})
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    static detail(req, res) {
        Task.findOne({_id: req.params.TaskId})
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    static saveTodo(req, res) {
        Task.update(
            {_id: req.body.TaskId},
            {
                status: req.body.status,
            },
        )
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

}

module.exports = TaskController;