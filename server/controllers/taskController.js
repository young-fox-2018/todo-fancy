const Task = require('../models/user')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('../helpers/tokenGenerator')
const loginValidation = require('../helpers/loginValidation')

module.exports = {
        create: function(req,res,next) {
            if(loginValidation) {
                var newTask = {
                    name: req.body.name,
                    desription: req.body.description,
                    due_date: req.body.due_date
                }
                Task.create(newTask)
                    .then(task => {
                        res.status(task.status).json({
                            msg: 'a task has been added'
                        })
                    })
                    .catch(err => {
                        res.status(err.status).json({
                            msg: err.message
                        })
                    })
            } else {
                res.status(400).json({
                   msg: 'you need to log in first' 
                })
            }        
        },
        read: function(req, res, next) {
            if(loginValidation) {
                let id = req.params._id
                Task.findById(id)
                    .then(task => {
                        res.status(task.response).json(task)
                    })
                    .catch(err => {
                        res.status(err.response.status).json({
                            msg: err.message
                        })
                    })
            } else {
                res.status(400).json({
                   msg: 'you need to log in first' 
                })
            }   
        },
        update: function(req, res, next) {
            if(loginValidation) {
                let id = req.params._id
                let update = {
                    name: req.body.name,
                    description: req.body.description,
                    status: req.body.status
                }
                Task.findByIdAndUpdate(id, update)
                    .then(response => {
                        res.status(response.status).json({
                            msg: 'update success'
                        })
                    })
                    .catch(err => {
                        res.status(err.response.status).json({
                            msg: err.message
                        })
                    })
            } else {
                res.status(400).json({
                   msg: 'you need to log in first' 
                })
            }        
        },
        delete: function(req, res, next) {
            if(loginValidation) {
                let id = req.params._id
                Task.findByIdAndDelete(id)
                .then(response => {
                    res.status(res.ponse.status).json({
                        msg: 'delete success'
                    })
                })
                .catch(err => {
                    res.status(err.response.status).json({
                        msg: err.message
                    })
                })
            } else {
                res.status(400).json({
                   msg: 'you need to log in first' 
                })
            }
        }
}