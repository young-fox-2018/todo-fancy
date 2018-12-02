const Task = require('../models/Task')
const User = require('../models/User')
const objectId = require('mongodb').ObjectID
const {inputGen} = require('../helpers/inputGen')
const {verToken} = require('../helpers/verifyToken')
const axios = require('axios')


module.exports = {
    newTask: function(req, res, next){
        let data = verToken(req.body.token)
        console.log(data, "data abis verify di newTask")
        User.findById(data.id,function(err, user){
            if(err){
                res.status(500).json({
                    message: "Error di Verify Token",
                    details: err.message
                })
            }
            else{
                if(user){
                    let input = {
                        name: req.body.name,
                        dueDate: req.body.dueDate,
                        description: req.body.description,
                        user: objectId(data.id)
                    }
                    Task.create(input, function(err, newJob){
                        if(err){
                            res.status(500).json({
                                message: "Error in creating new task",
                                details: err.message
                            })
                        }
                        else{
                            res.status(200).json({
                                message: "You have successfully register a new task up!",
                                task: newJob
                            })
                        }  
                    })
                }
                else{
                    res.status(500).json({
                        message: "You don't have access!"
                    })
                }
            }
        })
    },

    delTask: function(req, res, next){
        let data = verToken(req.body.token)
        User.findById(data.id,function(err, user){
            if(err){
                res.status(500).json({
                    message: "Error di Verify Token",
                    details: err.message
                })
            }
            else{
                if(user){
                    Task.findByIdAndDelete(req.body.taskId, function(err, task){
                        if(err){
                            res.status(400).json({
                                message: "Error in deleting task",
                                details: err.message
                            })
                        }
                        else{
                            if(task){
                                User.findByIdAndUpdate(task.user,{"$pull": {"taskList": task._id}}, function(err){
                                    if(err){
                                        res.status(500).json({
                                            message:"Errornya di findByIdAndUpdate Delete one",
                                            details: err.message
                                        })
                                    }
                                    else{
                                        res.status(200).json({
                                            message:"You have successfully deleted the task"
                                        })
                                    }
                                })
                            }
                            else{
                                res.status(500).json({
                                    message:"Task is not found!"
                                })
                            }
                        }
                    })
                }
            }
        })
    },

    findTask: function(req, res, next){
        Task.findById(req.body.id, function(err, task){
            if(err){
                res.status(400).json({
                    message: "Error in creating finding a task",
                    details: err.message
                })
            }
            else{
                if(task){
                    res.status(200).json({
                        message: "You have successfully deleted a task"
                    })
                }
                else{
                    res.status(500).json({
                        message: "The task doesn't exist"
                    })
                }
            }  
        })
    },

    updTask: function(req, res, next){
        let data = verToken(req.body.token)

        User.findById(data.id,function(err, user){
            if(err){
                res.status(500).json({
                    message: "Error di Verify Token",
                    details: err.message
                })
            }
            else{
                if(user){
                    Task.findByIdAndUpdate(req.body.taskId, {status: "Finished"},function(err, task){
                        if(err){
                            res.status(400).json({
                                message: "Error in updating a task",
                                details: err.message
                            })
                        }
                        else{
                            if(task){
                                res.status(200).json({
                                    message: "You have successfully edited the task"
                                })
                            }
                            else{
                                res.status(500).json({
                                    message: "The task doesn't exist"
                                })
                            }
                        } 
                    })
                }
                else{
                    res.status(500).json({message: "User not found!"})
                }
            }
        })
    }   
}