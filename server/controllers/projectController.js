const Project = require('../models/project')
const User = require('../models/user')
const mongoose = require('mongoose')

module.exports = {
    create: (req, res) => {
        Project.create({
            projectName: req.body.projectName,
            userId: mongoose.Types.ObjectId(req.body.userId)
        })
        .then(data => {
            res.status(200).json({
                msg: 'success create project',
                data: data
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    updateActivity: (req, res) => {
        Project.findByIdAndUpdate(req.params.id, {
            $push: {
                activity: req.body.activity
            }
        })
        .then(data => {
            res.status(200).json({
                msg: 'success add activity',
                data: data
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    updateUser: (req, res) => {
        Project.findByIdAndUpdate(req.params.id, {
            $push: {
                userId: mongoose.Types.ObjectId(req.body.userId)
            }
        })
        .then(data => {
            res.status(200).json({
                msg: 'success invite user to project'
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    find: (req, res) => {
        User.find({
            _id: mongoose.Types.ObjectId(req.body.userId),
        }).populate('projectId').exec()
        .then(data => {
            res.status(200).json({
                msg: 'success get project',
                data: data
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    delete: (req, res) => {
        Project.findByIdAndDelete(req.body.id)
        .then(data => {
            res.status(200).json({
                msg: 'success delete project'
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    findMember: (req, res) => {
        Project.findOne({
            _id: mongoose.Types.ObjectId(req.body.id),
        }).populate('userId').exec()
        .then(data => {
            res.status(200).json({
                msg: 'success get project',
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