const Todo = require('../models/todo')
const User = require('../models/user')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    create: (req, res) => {
        Todo.create({
            userId: ObjectId(req.body.userId),
            activity: req.body.activity,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date
        })
        .then(data => {
            res.status(200).json({
                msg: 'success create todo',
                data: data
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })

    },
    findAll: (req, res) => {
        Todo.find({
            userId: new ObjectId(req.body.id)
        })
        .then(data => {
            res.status(200).json({
                msg: 'success get all data',
                data: data
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    findByActivity: (req, res) => {
        Todo.find({
            activity: new RegExp(req.body.activity, 'i'),
            userId: mongoose.Types.ObjectId(req.body.id)
        })
        .then(data => {
            res.status(200).json({
                msg: 'success search data',
                data: data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                err: err
            })
        })
    },
    update: (req, res) => {
        let query = {activity, status, due_date} = req.body
        console.log(query)
        Todo.findByIdAndUpdate(req.params.id, query)
        .then(data => {
            res.status(200).json({
                msg: 'success update todo',
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    delete: (req, res) => {
        Todo.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    findById: (req, res) => {
        Todo.findById(req.body.id)
        .then(data => {
            res.status(200).json({
                msg: 'succes find data',
                data: data
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    }
}