const Todo = require('../models/todo')
const moment = require('moment')

class Controller {
    static addTask(req, res) {
        Todo
            .create({
                name: req.body.name,
                description: req.body.description,
                status: "Pending",
                created_date: moment().format("MMM D, YYYY"),
                due_date: req.due_date,
                user: req.currentUserId,
                project: req.body.projectId
            })
            .then(response => {
                res.status(201).json({ message: "Task created", data: response })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: "Please see console for detail" })
            })
    }
    static getTask(req, res) {
        Todo
            .find({
                user: req.currentUserId
            })
            .populate('user')
            .then(response => {
                res.status(200).json({ message: "Data retrieved", data: response })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: "Please see console for detail" })
            })
    }
    static deleteTask(req, res) {
        Todo
            .deleteOne({
                _id: req.params.id
            })
            .then(response => {
                res.status(200).json({ message: "Data deleted" })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: "Please see console for detail" })
            })
    }
    static editTask(req, res) {
        let name = req.body.name
        let description = req.body.description
        let status = req.body.status

        name = name.replace(/^\s+|\s+$/g,'');
        description = description.replace(/^\s+|\s+$/g,'');
        status = status.replace(/^\s+|\s+$/g,'');
        if (status == "Pending"|| status == "Done") {
            Todo
                .updateOne({
                    _id: req.params.id
                },
                    {
                        name: name,
                        description: description,
                        due_date: req.due_date,
                        status: status
                    })
                .then(response => {
                    res.status(200).json({ message: "Data edited"})
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ message: err.message, note: "Please see console for detail" })
                })
        } else {
                res.status(400).json({ message: "Status can only be 'Pending' or 'Done'" })
        }
    }
}

module.exports = Controller