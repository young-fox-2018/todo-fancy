const Todo = require('../models/Todo')
const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    create: (req, res) => {

        let userId = ObjectId(req._dataUser._id)
        let {name, description, dueDate} = req.body
        Todo.create({
            name,
            description,
            dueDate: new Date(dueDate)
        })
        .then((result_todo) => {
            let todoId = result_todo._id
            
            return User.findOneAndUpdate({
                _id: userId
            }, {
                $push: {
                    todos: todoId
                }
            })
        })
        .then((result_user) => {
            res.status(200).json(result_user)
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
    },
    readAll: (req, res) => {
        let data = req._dataUser
        // res.json(data)
        User.findOne({
            _id: data._id
        })
            .populate('todos')
            .then((result_user) => {
                res.status(200).json(result_user)
            }).catch((err) => {
                res.status(400).json({
                    message: err.message
                })
            });
    },
    delete: (req, res) => {
        let userId = req._dataUser._id
        Todo.findOneAndDelete({
            _id: ObjectId(req.params.todoId)
        })
        .then((result_todo) => {

            if(result_todo) {
                // res.status(200).json(result_todo)
                return User.findOneAndUpdate({
                    _id: ObjectId(userId)
                }, {
                    $pull: {'todos': ObjectId(req.params.todoId)}
                })
            } else{
                res.status(400).json({
                    message: 'todo not found'
                })
            }
        })
        .then((result_user) => {
            res.status(200).json(result_user)
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
        
    },
    readOne: (req, res) => {

        Todo.findOne({
            _id: ObjectId(req.params.todoId)
        })
        .then((result_todo) => {

            if(result_todo) {
                res.status(200).json(result_todo)
            } else{
                res.status(400).json({
                    message: 'todo not found'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
    },
    update: (req, res) => {
        let {name, description, dueDate} =req.body

        let data = {
            name,
            description,
            dueDate
        }
        // console.log(req.params.todoId)
        Todo.findOneAndUpdate({
            _id: ObjectId(req.params.todoId)
        }, data)
        .then((result_todo) => {
            if(result_todo) {
                res.status(200).json(result_todo)
            } else{
                res.status(400).json({
                    message: 'todo not found'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
    },
    finished: (req, res) => {
        Todo.findByIdAndUpdate({
            _id: ObjectId(req.params.todoId)
        }, {
            status: true
        })
        .then((result_todo) => {
            if(result_todo) {
                res.status(200).json(result_todo)
            } else {
                res.status(400).json({
                    message: 'todo not found'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
    }
}