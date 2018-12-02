const inviteModel = require('../models/invitation')
const groupModel = require('../models/group')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
class Controller {
    static invite(req, res) {
        let user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        inviteModel.create({
            userId: req.body.userId,
            invitorId: user._id,
            groupId: req.body.groupId,
            status: false
        })
            .then(invite => {
                res.status(201).json({
                    data: invite
                })
            })
            .catch(err => {
                res.status(500).json({
                    err: err
                })
            })
    }
    static accept(req, res) {
        let user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        inviteModel.deleteOne({
            _id: req.body.inviteId
        })
            .then(group => {
                return groupModel.findOneAndUpdate({
                    _id: req.body.groupId
                }, {
                        $push: { 'members': user._id }
                    }, {
                        new: true
                    })
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    err: err
                })
            })
    }
    static reject(req, res) {
        inviteModel.deleteOne({
            _id: req.body.inviteId
        })
            .then(data => {
                let user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
                return inviteModel.find({
                    userId: user._id
                })
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    err: err
                })
            })
    }

    static readInvite(req, res) {
        let user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        inviteModel.find({
            userId: user._id
        })
            .populate('groupId')
            .populate('invitorId')
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                res.status(400).json({
                    msg: err
                })
            })
    }


}


module.exports = Controller