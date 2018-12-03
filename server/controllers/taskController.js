"use strict"

const Task = require('../models/Task')
const User = require('../models/User')
const mongoose = require('mongoose')
module.exports = {
    create: (req, res) => {
        Task.create( {
            name: req.body.name,
            details: req.body.details,
            due_date: req.body.due_date,
            status: req.body.status,
            userId: mongoose.Types.ObjectId(req.result._id)
        }, (err, task) => {
            if (err) {
                
                res.status(501).json( {
                    error: err,
                    msg: "Please try again later"
                })
            } else {
                res.status(201).json( {
                    task:task
                })
            }
        })
    },

    getAll: (req, res) => {
        console.log('GET ALL')
        Task.find({userId: req.result._id})
        .populate('userId')
        .exec(function (err, tasks) {
          if (err)  {
            res.status(500).json( {
                error: err,
                msg: "Please try again later"
            })
          } else {
            res.status(200).json( {
                tasks: tasks
            })
          }
        })
    },

    getDetail: (req, res) => {
        console.log('MASUK GA')
        Task.findById(req.params.taskId, (err, task) => {
            if(err) {
                res.status(500).json( {
                    error: err,
                    msg: "Please try again later"
                }) 
            } else {
                res.status(200).json( {
                    task: task
                })
            }
        })
    },

    delete: (req, res) => {
        Task.findOneAndDelete( {
             _id: req.body.id
            }, function (err, user) {
          if (err)  {
             res.status(500).json( {
                 msg: 'please try again',
                 err: err
             })
          } else {
              res.status(204).json( {
                  msg: "successfully deleted"
              })
          }
        })
    },

    update: (req, res) => {
        console.log("GAK MASUK KESINI LOH")
        console.log('SSS--S-SSS-', req.body)
        Task.findOneAndUpdate( {
             _id: req.body.id
            },  {
                name: req.body.name,
                details: req.body.details,
                due_date: req.body.due_date
            }, {new:true}, function (err, task) {
                if (err)  {
                    res.status(500).json( {
                        error: err,
                        msg: "Please try again later"
                    })
                  } else {
                      console.log(task)
                      res.status(200).json( {
                        task: task
                      })
                  }
        })
    },

    finishTask: (req, res) => {
        Task.findOneAndUpdate( {
             _id: req.body.id
        }, {
            status: req.body.status
        }, {new: true}, function (err, task) {
          if (err)  {
            res.status(500).json( {
                error: err,
                msg: "Please try again later"
            })
          } else {
              res.status(200).json( {
                task: task
              })
          }
        })
    }
}