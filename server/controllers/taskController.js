const Task = require('../models/task')
const ObjectId = require('mongoose').Types.ObjectId
const jwttoken = require('../helpers/jwttoken')
const request = require('request')

module.exports = {
    createTask: function(req, res) {
        let decoded = jwttoken.decodeToken(req.body.token)
            let newTask = Task({
                name: req.body.name,
                dueDate: req.body.date, // Masih ga yakin
                priority: false,
                user: decoded.id
            })
            newTask.save(function(err) {
                if (err) res.status(400).json({err:err})
                else {
                    res.status(200).json({
                        message: "Successfully add new task",
                        task: newTask
                    })
                }
            })
    }, 
    findAll: function(req, res) { // ga tau gunanya buat apa
        Task.find({}).populate('user').exec(function(err, tasks) {
            if (err) res.status(400).json({err:err})
            else {
                res.status(200).json({tasks:tasks})
            }
        })
    },
    findUserTask: function(req, res) { // find someone by email(X) mau g mau harus by id; ga usa di populate jugag  masalah
        // console.log(req.body.token)
        let  user = jwttoken.decodeToken(req.body.token)

        Task.find({user : user.id}).populate("user").exec(function(err, tasks) {
            if (err) res.status(400).json({err:err})
            else {
                res.status(200).json({tasks:tasks})
            }
        })
    },
    updateTask: function(req, res) {
        let update = {}
        if (req.body.dueDate != null) {
            update.dueDate = new Date(req.body.dueDate)
        } if (req.body.name != null) {
            update.name = req.body.name
        } if (req.body.priority != null) {
            update.priority = req.body.priority
        }
        console.log(update, "UPDATEEEE")
        console.log(req.query.id, "QUERYYY ID")
        User.findByIdAndUpdate(req.query.id, update, function(err, user) {
            console.log(user, "USERRR")
            if (err) res.status(400).json({err: err.message});
            else {
                res.status(200),json({
                    message: "Successfully updated",
                    update: update
                })
            }
          });
    },
    deleteTask: function(req, res) {
        Task.findByIdAndRemove(req.query.id, function(err) {
            if (err) res.status(400).json({err:err})
            else {
                res.status(200).json({message: `Successfuly deleted task`})
            }
        })
    }
}





