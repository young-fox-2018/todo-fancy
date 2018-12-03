const Task = require('../models/Task')
const Project = require('../models/Project')

class Controller {
    static create(req,res){
        Task.create({
            name: req.body.name,
            description: req.body.description,
            due_date: new Date(req.body.due_date),
            owner: req.decoded.id
        })
            .then(task=>{
                res.status(201).json(task)
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static findAll(req,res){
        Task.find({
            owner: req.decoded.id
        })
            .then(tasks=>{
                // console.log('masuk sinii bos', tasks)
                res.status(200).json(tasks)
            })
            .catch(err=>{
                res.status(200).json({errors: err.errors || err.message})
            })
    }

    static findProjectTasks(req,res){
        Task.find({
            projectId: req.params.id
        })
            .then(tasks=>{
                res.status(200).json(tasks)
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static show(req,res){
        Task.findOne({
            _id: req.params.id
        })
            .then(task=>{
                res.status(200).json(task)
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static update(req,res){
        Task.findOneAndUpdate({
            _id: req.params.id
        }, {
            name: req.body.name,
            description: req.body.description,
            due_date: new Date(req.body.due_date),
            owner: req.decoded.id,
            status: req.body.status
        })
            .then(task=>{
                res.status(200).json({updated: task})
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static destroy(req,res){
        Task.findByIdAndDelete({
            _id: req.params.id
        })
            .then(task=>{
                res.status(200).json({deleted: task})
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })
    }
}

module.exports = Controller