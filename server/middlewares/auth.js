const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Todo = require('../models/todo')
require('dotenv').config()
const ObjectId = require('mongodb').ObjectID

module.exports = {
    isLogin: (req, res, next) => {
        let token = req.headers.token
        if (token) {
            jwt.verify(token, process.env.secret, function (err, decoded) {
                if (err) {
                    res.status(400).json({
                        message: `Your token is invalid!`
                    })
                } else {
                    User.findOne({
                        _id: decoded.id
                    })
                        .then(user => {
                            if (user) {
                                req.decoded = user
                                next()
                            } else {
                                res.status(400).json({
                                    message: `Username is not found!`
                                })
                            }
                        })
                        .catch(err => {
                            res.status(400).json({
                                message: err.message
                            })
                        })
                }
            })
        } else {
            res.status(400).json({
                message: `You dont have access token!`
            })
        }

    },
    isOwner: (req, res, next) => {
        Todo.findOne({
            _id: req.params.todoId
        })
            .then(todo => {
                if (todo.userId == req.decoded.id) {
                    next()
                } else {
                    res.status(400).json({
                        message: `Your acces is forbidden!`
                    })
                }
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                })
            })
    }
}