const Task = require('../models/Task')

class taskController {

    static addTask(req, res) {
        let inputTask = {
            userid: req.userlogin.id,
            description: req.body.description
        }
        Task.create(inputTask)
            .then(function() {
                res.status(200).json({
                    message: "Successfully add task"
                })
            })
            .catch(function(err) {
                res.status(400).json({
                    error: err.message
                })
            })
    }

    static showAll(req,res) {
        Task.find({userid:req.params.userid})
            .then(function(tasks) {
                res.status(200).json(tasks)
            })
            .catch(function(err) {
                res.status(400).json({
                    message: err.message
                })
            })
    }

    static delete(req, res) {
        Task.findOneAndDelete({id: req.params.id})
            .then(function(task) {
                res.status(201).json({
                    message: `${task.description} has been delete from list`
                })
            })
            .catch(function(err) {
                res.status(400).json({
                    error: err.message
                })
            })
    }

    static update(req, res) {
        console.log('udah sampe sini <======')
        let dataUpdate = {
            description: req.body.description,
            iscomplete: req.body.iscomplete
        }
        Task.findByIdAndUpdate(
            {_id: req.params.taskid},
            {$set: dataUpdate},
            {new: true})
            .then(function(task) {
                res.status(201).json({
                    message: "successfully updated task"
                })
            })
            .catch(function(err) {
                console.log(err.message)
                res.status(400).json({
                    error: err.message
                })
            })
    }

}

module.exports = taskController