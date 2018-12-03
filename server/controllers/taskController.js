const Task = require('../models/task')
const User = require('../models/user')

module.exports = {
    all: function(req, res, next) {
        User.findOne({_id: req.currentUser._id}).populate('tasks')
            .then(user => {
                res.status(200).json(user.tasks)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    findOne: function(req, res, next) {
        Task.findById({_id: req.params.taskId})
            .then(task => {
                res.status(200).json(task)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    create: function(req, res, next) {
        let newTask = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate,
        }
        let temp = ''
        Task.create(newTask)
            .then(newTask => {
                temp = newTask
                return User.findOneAndUpdate({_id: req.currentUser._id}, {$push: {tasks: newTask._id}}, {new: true})
            })
            .then(userData => {
                res.status(201).json({msg: 'new task created', temp, userData})
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    update: function(req, res, next) {
        let updatedData = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate
        }
        Task.findOneAndUpdate({_id: req.params.taskId}, updatedData, {new: true})
            .then(updatedTask => {
                res.status(201).json({msg: 'update success', updatedTask})
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    delete: function(req, res, next) {
        let temp = ''
        Task.deleteOne({_id: req.params.taskId})
            .then(result => {
                temp = result
                return User.findOneAndUpdate({_id: req.currentUser._id}, {$pull: {tasks: req.params.taskId}}, {new: true})
            })
            .then(updatedData => {
                res.status(200).json({msg: 'task deleted', temp, updatedData})
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }
}