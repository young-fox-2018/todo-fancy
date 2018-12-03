const Task = require("../models/task")


module.exports = {
    addTask: (req, res) => {
        console.log(req.decoded);

        Task.create({
            UserId: req.decoded._id,
            name: req.body.task_name,
            description: req.body.description,
            dueDate: req.body.due_date
        })
            .then(() => {
                res.status(200).json({
                    msg: "succes"
                })
            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    updateTask: (req, res) => {
        Task.updateOne(
            { _id: req.body.id },
            {
                UserId: req.decoded._id,
                name: req.body.task_name,
                description: req.body.description,
                dueDate: req.body.due_date
            })
            .then((result) => {
                res.status(200).json({
                    msg: "succes"
                })

            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    deleteTask: (req, res) => {
        Task.deleteOne({ _id: req.body.id })
            .then(() => {
                res.status(200).json({
                    msg: "succces"
                })
            }).catch((err) => {

            });
    },
    findTask: (req, res) => {
        Task.find({ UserId: req.decoded._id })
            .then((tasks) => {
                console.log(tasks);
                res.status(200).json({
                    tasks
                })
            }).catch((err) => {
                res.status(200)
            });
    },
    updateStatus: (req, res) => {
        Task.updateOne(
            { _id: req.body.id },
            {
                status: true
            })
            .then((result) => {
                res.status(200).json({
                    msg: "succes"
                })

            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    updatePriority: (req, res) => {
        Task.updateOne(
            { _id: req.body.id },
            {
                priority: true
            })
            .then((result) => {
                res.status(200).json({
                    msg: "succes"
                })

            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    findPriority: (req, res) => {
        Task.find({ UserId: req.decoded._id, priority: true })
            .then((tasks) => {
                console.log(tasks);
                res.status(200).json({
                    tasks
                })
            }).catch((err) => {
                res.status(200)
            });
    }


}