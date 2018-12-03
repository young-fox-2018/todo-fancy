const mongoose = require('mongoose')
const Todo = require('../models/todo.js')
const ObjectId = mongoose.Types.ObjectId
module.exports = {
    create: (req, res) => {
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate,
            user: req.id
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
        console.log(req.id)
        Todo.find({
            user: ObjectId(req.id)
        })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    },
    update: (req, res) => {
        console.log(req.params.id, '==========')
        console.log("masuk update")
        let params = {}
        // let whiteList = ['description']
        for (let key in req.body) {
            // whiteList.includes(key)
            params[key] = req.body[key]
        }
        Todo.updateOne({_id: ObjectId(req.params.id)}, params)
            .then(data => {
                console.log("berhasil update")
                res.status(200).json({
                    msg: "Successfully updated!"
                })
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    },
    delete: (req, res) => {
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