const Task = require('../models/task.js')

class TaskController {
    static addNew(req, res) {
        Task.create({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            userID: req.userID
        })
            .then( task => {
                res.status(201).json({
                    task
                })
            })
            .catch( err => {
                res.status(500).json({ 
                    error: err.errors.title,
                    message: 'error from create new task'
                })
            })
    }

    static readAll(req, res) {
        Task.find({
            userID: req.userID
        }) 
        .then(tasks => {
            res.status(200).json({
                tasks
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err.errors.title,
                message: 'error from read al tasks'
            }) 
        })
    }


    static readAllDone(req, res) {
        Task.find({
            userID: req.userID, 
            status: 'done'
        }) 
        .then(tasks => {
            res.status(200).json({
                tasks
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err.errors.title,
                message: 'error from readAlldone task'
            }) 
        })
    }

    
    static readAllPending(req, res) {
        Task.find({
            userID: req.userID, 
            status: 'pending'
        }) 
        .then(tasks => {
            res.status(200).json({
                tasks
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err.errors.title,
                message: 'error from read all pending tasks'
            }) 
        })
    }

    static update(req, res) {
        Task.findOne({
            _id: req.params.taskID,
            userID: req.userID
        })
            .then( task => {
                if (!task) {
                    res.status(400).json({
                        message: `taskID ${req.params.taskID} is not available`
                    })
                } 
                else {
                    Task.updateOne({
                        _id: req.params.taskID
                    }, {
                        title: req.body.title,
                        description: req.body.description,
                        due_date: req.body.due_date,
                        userID: req.userID 
                    })
                        .then( updatedTask => {
                            res.status(200).json({
                                message: `task with ID: ${req.params.taskID} has been updated`
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                err: err,
                                message: 'error from updating task'
                            })
                        })
                }
            })
            .catch( err => {
                res.status(500).json({
                    err: err.message,
                    message: 'error from finding task'
                })
            })
    }

    static markAsDone(req, res) {
        Task.findOne({
            _id: req.params.taskID
        })
            .then( task => {
                if (!task) {
                    res.status(400).json({
                        message: `taskID ${req.params.taskID} is not available`
                    })
                } 
                else {
                    Task.updateOne({
                        _id: req.params.taskID
                    }, {
                        status: 'done'
                    })
                        .then( updatedTask => {
                            res.status(200).json({
                                message: `task with ID: ${req.params.taskID} has been updated as done`
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                err: err,
                                message: 'error from updating task as done'
                            })
                        })
                }
            })
            .catch( err => {
                res.status(500).json({
                    err: err.message,
                    message: 'error from finding task'
                })
            })
    }

    static delete(req, res) {
        Task.deleteOne({
            _id: req.params.taskID
        })
        .then( data => {
            res.status(200).json({
                message: `task with ID ${req.params.taskID} has been deleted`
            }) 
        })
        .catch( err => {
            res.status(500).json({
                err: err,
                message: 'error from delete task'
            })
        })
    }
}


module.exports = TaskController