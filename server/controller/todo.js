const mongoose = require('mongoose')
const Todo = require('../models/todo.js')
const ObjectId = mongoose.Types.ObjectId
module.exports = {
    create: (req, res) => {
        console.log("masuk create")
        console.log(req.body)
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate,
            user: req.body.user
        })
            .then(result => {
                res.status(201).json({
                    result: result,
                    message: "Successfully added to list!"
                })
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    },
    readAll: (req, res) => {
        Todo.find({
            //user: ObjectId("5c02587023edfd4b94268f88")
        })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    },
    update: (req, res) => {
        let params = {}
        for (let key in req.body) {
            params[key] = req.body[key]
        }
        Todo.update({_id: ObjectId(req.body.id)}, params)
            .then(data => {
                res.status(200).json({
                    msg: "Successfully updated!"
                })
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    },
    delete: (req, res) => {
        console.log(req.body.id)
        console.log("masuk delete")
        Todo.deleteOne({_id: ObjectId(req.body.id)})
            .then(data => {
                res.status(200).json({
                    msg: "Successfully deleted!"
                })
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    }
}