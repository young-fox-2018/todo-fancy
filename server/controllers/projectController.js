const Project = require('../models/project')
const Task = require('../models/task')

class ProjectController {
    static addNew(req, res) {
        Project.create({
            name: req.body.name,
            userID: req.userID,
            members: [req.userID]
        })
            .then( project => {
                res.status(201).json({
                    project
                })
            })
            .catch( err => {
                res.status(500).json({
                    err,
                    message: `error from creating new project`
                })
            })
    }

    static readAll(req, res) {
        Project.find({
            members: req.userID
        })
            .then( projects => {
                res.status(200).json({
                    projects
                })
            })
            .catch( err => {
                res.status(500).json({
                    err: err,
                    message: 'error from readAll project'
                })
            })
    }

    static addTask(req, res) {
        Task.create({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date, 
            userID: req.userID,
            projectID: req.params.projectID
        })
            .then( task => {
                res.status(201).json({
                    task
                })
            })
            .catch( err => {
                res.status(500).json({
                    err,
                    message: 'error from add new task to project'
                })
            })
    }

    static updateTask(req, res) {
        Task.findOneAndUpdate({
            projectID: req.params.projectID,
            _id: req.params.taskID
        }, {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        })
            .then( task => {
                res.status(200).json({
                    beforeUpdatedTask: task,
                    message: `task ID ${req.params.taskID} has been updated`
                })
            })
            .catch( err=> {
                res.status(500).json({
                    err,
                    message: 'error from updating task in project'
                })
            })
    }

    static readAllTasks(req, res) {
        Task.find({
            projectID: req.params.projectID
        })
            .then( tasks => {
                res.status(200).json({
                    tasks
                })
            })
            .catch( err => {
                res.status(500).json({
                    err,
                    message: 'error from readAllTask in project'
                })
            })
    }
}

module.exports = ProjectController