const Task = require('../models/task.js');

class TaskController {

    static create(req, res) {
        Task.create({
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date,
        })
            .then(function(newTask) {
                res.status(201).json(newTask);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    static read(req, res) {
        Task.find({})
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

}

module.exports = TaskController;