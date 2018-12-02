const User = require('../models/user')
const helper = require('../helpers/helper')

module.exports = {
    register: (req, res) => {
        User.create({
            email: req.body.email,
            password: req.body.password
        })
        .then(data => {
            res.status(200).json({
                msg: 'succes register'
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    login: (req, res) => {
        User.findOne({
            email: req.body.email
        })
        .then(data => {
            if(!data) {
                res.status(400).json({
                    msg: 'wrong email'
                })
            } else {
                let compare = helper.compare(data.password, req.body.password)
                if(!compare) {
                    res.status(400).json({
                        msg: 'wrong password'
                    })
                } else {
                    res.status(200).json({
                        token: helper.token(data),
                        id: data._id
                    })
                }
            }
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    addProject: (req, res) => {
        User.findByIdAndUpdate(req.body.id, {
            $push: {
                projectId: req.body.projectId
            }
        })
        .then(data => {
            res.status(200).json({
                msg: 'success add project'
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    inviteProject: (req, res) => {
        User.updateOne({
            email: req.body.email
        },
        {
            $push: {
                projectId: req.body.projectId
            }
        },
        {
            new: true
        })
        .then(data => {
            if(data.n === 0) {
                res.status(400).json({
                    msg: 'wrong email'
                })
            } else {
                res.status(200).json({
                    data: data
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    findByEmail: (req, res) => {
        User.findOne({
            email: req.body.email
        })
        .then(data => {
            res.status(200).json({
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