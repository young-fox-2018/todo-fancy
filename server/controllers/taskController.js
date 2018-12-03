const Task = require('../models/task')
const User = require('../models/user')
const formatDate = require('../helpers/formatDate')

module.exports = {
    addTask: function (req, res, next) {

        let taskAdd = ''
        let newTask = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Task.create(newTask)
            .then(function (task) {
                taskAdd = task
                return User.updateOne({ _id: req.currentUser._id }, { $push: { tasks: task._id } })
            })
            .then(function (user) {
                res.status(200).json({
                    msg: `Successfully add new Task`,
                    userLogin: user,
                    task: taskAdd
                })
            })
            .catch(function (err) {
                res.status(400).json(err.message)
            })
    },
    findAll: function (req, res, next) {
        User.findOne({ _id: req.currentUser._id }).populate('tasks')
            .then(function (taskUserLogin) {
                res.status(200).json(taskUserLogin.tasks)
            })
            .catch(function (err) {
                res.status(400).json(err.message)
            })
    },
    updateTask: function (req, res, next) {
        Task.findOneAndUpdate({ _id: req.params.id }, { $set: { status: true } })
            .then(function (taskUpdated) {
                res.status(200).json(taskUpdated)
            })
            .catch(function (err) {
                res.status(400).json(err.message)
            })
    },
    deleteTask: function (req, res, next) {
        let result = ''
        Task.findOneAndDelete({ _id: req.params.id })
            .then(function (task) {
                result = task
                return User.findOneAndUpdate({ _id: req.currentUser._id }, { $pull: { tasks: task._id } }, { new: true })
            })
            .then(function (deleteTaskFromUser) {
                res.status(200).json({
                    msg: `${result.description} deleted`
                })
            })
            .catch(function (err) {
                res.status(400).json(err.message)
            })
    }
}