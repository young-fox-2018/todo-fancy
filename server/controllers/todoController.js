const Todo = require('../models/todo')
const ObjectId = require('mongodb').ObjectID


module.exports = {
    add: (req, res) => {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            date: req.body.date,
            location: req.body.location,
            userId: req.decoded._id
        }
        Todo.create(newTodo)
            .then(() => {
                res.status(200).json({
                    message: `Succesfully add task in TODOs`
                })
            })
            .catch(err => {
                // console.log(err.message)
                res.status(400).json({
                    errors: err.message
                })
            })
    },
    read: (req, res) => {
        Todo.find({ userId: req.decoded._id })
            .then(todos => {
                res.status(200).json({
                    todos
                })
            })
            .catch(err => {
                message: err.message
            })
    },
    update: (req, res) => {
        let todoUpdate = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            date: req.body.date,
            location: req.body.location
        }
        Todo.updateOne({ _id: req.params.todoId }, {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            date: req.body.date,
            location: req.body.location
        })
            .then((data) => {
                res.status(200).json({
                    message: `Succesfully update your todos!`,
                    data: data
                })
            })
            .catch(err => {
                res.status(400).json({
                    errors: err.message
                })
            })
    },
    delete: (req, res) => {
        let id = {
            _id: ObjectId(req.params.todoId)
        }
        Todo.findOneAndDelete(id)
            .then((todo) => {
                res.status(200).json({
                    message: `Succesfully delete your TODOs`,
                    data: todo
                })
            })
            .catch(err => {
                res.status(400).json({
                    errors: err.message
                })
            })
    },
    detail: (req, res) => {
        Todo.findOne({
            _id: req.params.todoId
        }).
            populate('userId')
            .then(todo => {
                res.status(200).json({ data: todo })
            })
            .catch(err => {
                errors.err.message
            })
    },
    complete: (req, res) => {
        let newStatus = true,
            id = ObjectId(req.params.todoId)
        Todo.findOneAndUpdate({ _id: id }, { $set: { status: true } })
            .then((todo) => {
                res.status(200).json({
                    message: `Succesfully complete your todos!`,
                    data: todo
                })
            })
            .catch(err => {
                res.status(400).json({
                    errors: err.message
                })
            })
    }

}