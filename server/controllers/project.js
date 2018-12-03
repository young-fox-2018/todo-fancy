const Project = require('../models/Project')
const Task = require('../models/Task')
const User = require('../models/User')

class Controller {
    static create(req,res){
        let newProject = new Project({
            name: req.body.name
        })
        newProject.members.push(req.decoded.id)
        newProject.save()
            .then(project=>{
                res.status(201).json(project)
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static join(req,res){
        Project.findOneAndUpdate({
            _id: req.params.id
        }, {
            $push: {members: req.decoded.id}
        })
            .then(project=>{
                User.findOneAndUpdate({
                    _id: req.decoded.id
                }, {
                    $push: {projectLists: project._id},
                    $pull: {projectInvitations: project._id}
                })
                    .then(user=>{
                        res.status(200).json({updated: {user,project}})
                    })
                    .catch(err=>{
                        res.status(400).json({errors: err.errors || err.message})
                    })
                
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })  
    }

    static addTask(req,res){
        Task.create({
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date,
            projectId: req.params.id
        })
            .then(task=>{
                Project.findOneAndUpdate({
                   _id: req.params.id 
                }, {
                    $push: {tasks: task.id}
                })
                    .then(project=>{
                        res.status(200).json(project)
                    })
                    .catch(err=>{
                        res.status(400).json({errors: err.errors || err.message})
                    })
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })
    }

}

module.exports = Controller 