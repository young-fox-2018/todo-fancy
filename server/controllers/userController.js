const User = require('../models/user')
const Project = require('../models/project')
const bcrypt = require('bcrypt');
const getJWTtoken = require('../helpers/JWTtoken')
const bcryptCompare = require('../helpers/bcryptCompare')
ObjectId = require('mongodb').ObjectID;
const axios = require('axios');
require('dotenv').config()


class UserController {
    static readAll(req, res) {
        User.find({})
            .then( users => {
                res.status(200).json({
                    users
                })
            })
            .catch( err => {
                res.status(500).json({
                    err,
                    message: 'error from readAll users'
                })
            })
    }

    static register(req, res) {
        User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        })
            .then( user => {
                res.status(201).json({
                    user,
                    message: 'Congratulation! You have been registered! Please login to continue.'
                })
            })
            .catch( err => {
                res.status(500).json({ 
                    err: err.message,
                    message: 'error from creating new user'
                })
            })
    }

    static login(req, res) {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({
                message: "email or password field must be filled in"
            })
        } 
        else {
            User.findOne({
                email: req.body.email
            })
                .then( user => {
                    let result = bcryptCompare(req.body.password, user.password)
                    if (result === true) {
                        let accesstoken = getJWTtoken({
                            email: user.email
                        })
                        res.status(200).json({accesstoken})
                    }
                    else {
                        res.status(400).json({
                            err: err,
                            message: 'invalid password'
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({err, message: "error from login"})
                })
            
        }
    }

    static fbLogin(req, res) {
        axios({
            method: 'GET',
            url: `https://graph.facebook.com/v3.2/me?fields=name,email&access_token=${req.body.fbToken}` 
        }) 
            .then( response => {
                User.findOne({
                    email: response.data.email
                })
                    .then( user => {
                        if (!user) { 
                            User.create({
                                name: response.data.name,
                                email: response.data.email,
                                password: 'FBpassword',
                                fbLogin: true
                            })
                                .then( user => { 
                                    let accesstoken = getJWTtoken({
                                        email: user.email
                                    })
                                    res.status(201).json({
                                        accesstoken,
                                        message: 'new user has been created and jwt token is generated'
                                    })
                                })
                                .catch( err => {
                                    res.status(500).json({
                                        err: err.errors,
                                        message: 'error from creating new user from fb login'
                                    })
                                })
                        }
                        else {
                            let accesstoken = getJWTtoken({
                                email: user.email
                            })
                            res.status(201).json({
                                accesstoken,
                                message: 'generated accesstoken from fb login'
                            })
                        }
                    })
                    .catch( err => {
                        res.status(500).json({
                            err: err,
                            msessage: 'error from fb Login findOne user'
                        })
                    })
            })
            .catch( err => {
                res.status(500).json({
                    err: err,
                    message: 'error from facebook login'
                })
            })

    }

    static sendInvitation(req, res) {
        Project.findOne({ 
            _id: req.params.projectID
        })
            .then( project => {
                User.findOne({ 
                    $and: [{
                        _id: req.params.userID
                    },{
                        _id: project.members
                    }]
                })
                    .then( member => { 
                        if (member) { 
                            res.status(400).json({
                                message: 'User is already registered as member of this project'
                            })
                        }
                        else { 
                            User.findOne({
                                _id: req.params.userID,
                                invitations: req.params.projectID
                            })
                                .then( user => { 
                                    if (user) { 
                                        res.status(400).json({
                                            message: `This user has been invited as member of this project. Please wait for their confirmation`
                                        })
                                    }
                                    else { 
                                        User.findOneAndUpdate({
                                            _id: req.params.userID,
                                        }, {
                                            $push: { invitations: req.params.projectID }
                                        })
                                            .then( user => {
                                                res.status(200).json({
                                                    message: `Project invitation has been sent to ${user.email}`
                                                })
                                            })
                                            .catch( err => {
                                                res.status(500).json({
                                                    err,
                                                    message: 'Error from inviting user to a project'
                                                })
                                            })
                                    }
                                })
                                .catch( err => {
                                    res.status(500).json({
                                        err,
                                        message: 'error from sending invitation'
                                    })
                                })
                            }
                    })
                    .catch( err => {
                        res.status(500).json({
                            err,
                            message: 'error from finfing user'
                        })
                    })
            })
            .catch( err => {
                res.status(500).json({
                    err,
                    message: 'error from finding project'
                })
            })
        


    }

    static seeInvitation(req, res) {
        User.findOne({
            _id: req.userID
        })
            .populate('invitations')
            .then( response => {
                res.status(200).json({
                    invitations: response.invitations
                })
            })
            .catch( err => {
                res.status(500).json({
                    err,
                    message: 'error from read all invitations'
                })
            })
    }

    static approveInvitation(req, res) {
        User.findOne({
            _id: req.userID
        })
            .then( user => {
                let result = user.invitations.filter(group => {
                    return group == req.params.projectID})
                if (result.length === 0) {
                    res.status(400).json({
                        message: 'You do not have access to approve this project invitation'
                    })
                }
                else {
                    User.updateOne({
                        _id: req.userID
                    }, {
                        $pull: { invitations: req.params.projectID }
                    })
                        .then( response => {
                            Project.findOneAndUpdate({
                                _id: req.params.projectID
                            }, {
                                $push: { members: req.userID }
                            })
                                .then( project => {
                                    res.status(200).json({
                                        message: `You have been added as a member of group ${project.name}`
                                    })
                                })
                                .catch( err => {
                                    res.status(500).json({
                                        err,
                                        message: 'error from findOne Project'
                                    })
                                })
                        })
                        .catch( err => {
                            res.status(500).json({
                                err,
                                message: 'error from pull invitation from user'
                            })
                        })
                }
            })
            .catch( err => {
                res.status(500).json({
                    err,
                    message: 'error from approve invitations'
                })
            })
    }

    static rejectInvitation(req, res) {
        User.findOneAndUpdate({
            _id: req.userID
        }, {
            $pull: { invitations: req.params.projectID }
        })
            .then( response => {     
                res.status(200).json({
                    message: `You have rejected this invitation`
                })
            })
            .catch( err => {
                res.status(500).json({
                    err,
                    message: 'error from rejecting invitation'
                })
            })
    }
}

module.exports = UserController