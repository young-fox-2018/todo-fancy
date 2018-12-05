const groupModel = require('../models/group')
const taskModel = require('../models/taskGroup')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class Controller {
    static create(req, res) {
        let user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        groupModel.create({
            name: req.body.name
        })
            .then(group => {
                return groupModel.findOneAndUpdate({
                    _id: group._id
                }, {
                        $push: { 'members': user._id },
                    }, {
                        new: true
                    })
            })
            .then(data => {
                res.status(201).json({
                    data: data
                })
            })
            .catch(err => {
                res.status(500).json({
                    err: err.message
                })
            })
    }

    static leaveGroup(req, res) {
        let user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        groupModel.findOneAndUpdate({
            _id: req.body.groupId
        }, {
                $pull: { 'members': user._id }
            }, {
                new: true
            })
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    err: err
                })
            })
    }

    static createTask(req, res) {
        let user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        taskModel.create({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate,
            isComplete: false,
            author: user._id,
            group: req.body.group
        })
            .then(task => {
                return groupModel.findOneAndUpdate({
                    _id: req.body.group
                }, {
                        $push: { 'tasks': task._id }
                    }, {
                        new: true
                    })
                    .populate({
                        path: 'tasks',
                        populate: {
                            path: 'author'
                        }
                    })
            })
            .then(data => {
                res.status(201).json({
                    data: data
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    err: err
                })
            })
    }

    static deleteTask(req, res) {
        taskModel.deleteOne({
            _id: req.body.taskId
        })
            .then(data => {
                return taskModel.find({
                    group: req.body.groupId
                })
                    .populate({
                        path: 'tasks',
                        populate: {
                            path: 'author'
                        }
                    })
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    err: err
                })
            })
    }

    static updateTask(req, res) {
        let user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        taskModel.findOneAndUpdate({
            _id: req.body.taskId
        }, {
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                dueDate: req.body.dueDate,
            }, {
                new: true
            })
            .then(data => {
                 return taskModel.find({
                    group: req.body.groupId
                })
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    err: err
                })
            })
    }

    static readGroup(req, res) {
        let user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        groupModel.find({
            members: user._id
        })
            .populate('tasks')
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static readGroupTask(req, res) {
        let user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        groupModel.findOne({
            _id: req.body.projectId
        })
            .populate({
                path: 'tasks',
                populate: {
                    path: 'author'
                }
            })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static findTask(req, res) {
        taskModel.findOne({
            _id: req.body.taskId
        })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }
    static completeTask(req,res){
        let user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        taskModel.findOne({
            _id: req.body.taskId
        })
        .then(data => {
            if (data.isComplete == false){
                return taskModel.findOneAndUpdate({
                    _id: req.body.taskId
                }, {
                    isComplete :true
                })
            } else {
                return taskModel.findOneAndUpdate({
                    _id: req.body.taskId
                }, {
                    isComplete :false
                })
            }
        })
        .then(data => {
            return taskModel.find({
                group: req.body.groupId
            })
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                err:err
            })
        })
           
    }
}

module.exports = Controller