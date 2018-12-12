const Task = require('../models/task')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('../helpers/tokenGenerator')
const loginValidation = require('../helpers/loginValidation')

module.exports = {
        readAll: function(req,res,next) {
            Task.find()
                .then(allTask => {
                    res.status(200).json(allTask)
                })
                .catch(err => {
                    res.status(400).json({
                        msg: err.message
                    })
                })
        },
        create: function(req,res,next) {
            // if(loginValidation) {
                var newTask = {
                    name: req.body.name,
                    description: req.body.description,
                    due_date: req.body.due_date
                }
                console.log(req.body)
                console.log('masuk sini ')
                Task.create(newTask)
                    .then(task => {
                        res.status(200).json({
                            msg: 'a task has been added'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({
                            msg: err.message
                        })
                    })
            // } else {
                // res.status(400).json({
                //    msg: 'you need to log in first' 
                // })
            // }        
        },
        read: function(req, res, next) {
            console.log("masuk oi")
            
            // if(loginValidation) {
                console.log(req.body.id);
                let id = req.body.id
                Task.findById(id)
                    .then(task => {
                        console.log("masuk response");
                        res.status(200).json(task)
                    })
                    .catch(err => {
                        console.log("masuk error");                        
                        res.status(400).json({
                            msg: err.message
                        })
                    })
            // } else {
                // res.status(400).json({
                //    msg: 'you need to log in first' 
                // })
            // }   
        },
        update: function(req, res, next) {
            // if(loginValidation) {
                let id = req.body.id
                let update = {
                    name: req.body.name,
                    description: req.body.description,
                    due_date: req.body.due_date,
                    status: req.body.status
                }
                console.log(id);
                console.log(update);
                Task.findByIdAndUpdate(id, update)
                    .then(updatedTask => {                        
                        console.log(typeof updatedTask)
                        res.status(200).json({
                            msg: 'update success'
                        })
                    })
                    .catch(err => {
                        res.status(400).json({
                            msg: err.message
                        })
                    })
            // } else {
                // res.status(400).json({
                //    msg: 'you need to log in first' 
                // })
            // }        
        },
        delete: function(req, res, next) {
            // if(loginValidation) {
                let id = req.body.id
                Task.findByIdAndDelete(id)
                .then(response => {
                    res.status(200).json({
                        msg: 'delete success'
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        msg: err.message
                    })
                })
            // } else {
            //     res.status(400).json({
            //        msg: 'you need to log in first' 
            //     })
            // }
        }
}