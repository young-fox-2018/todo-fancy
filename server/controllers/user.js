const User = require('../models/User')
const bcryptHelper = require('../helpers/bcryptHelper')
const jwtHelper = require('../helpers/jwtHelper')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const axios = require('axios')

class Controller {
    static register(req,res){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then(user=>{
                res.status(201).json(user)
            })
            .catch(err=>{
                console.log(err)
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static login(req,res){
        User.findOne({
            email: req.body.email
        })
            .then(user=>{
                if(bcryptHelper.match(req.body.password, user.password)){
                    let accessToken = jwtHelper.encode({
                        name: user.name,
                        id: user._id
                    })
                    res.status(200).json({accessToken})
                } else {
                    res.status(200).json({errors: {login : {message: 'email and password missmatch'}}})
                }
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static findAll(req,res){
        User.find()
            .then(users=>{
                let currentUser = users.indexOf(req.decoded.id)
                users.splice(currentUser, 1)
                res.status(200).json(users)
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static inviteProject(req,res){
        User.findOneAndUpdate({
            _id: req.params.userId
        }, {
            $push: {projectInvitations: req.params.projectId}
        })
            .then(user=>{
                res.status(200).json(user)
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static fbLogin(req,res){
        let accessToken = req.body.accessToken
        // console.log(accessToken)
        axios({
            method: 'GET',
            url:  `https://graph.facebook.com/v3.2/me?fields=id,name,email&access_token=${accessToken}`
        })
            .then(response=>{
                console.log('halloo sini di server', response.data)
                let userFb = response.data
                User.findOne({
                    email: userFb.email
                })
                    .then(user=>{
                        if(user){
                            let data = {
                                id: user._id,
                                name: userFb.name
                            }
                            res.status(200).json({accessToken: jwtHelper.encode(data)})
                        } else {
                            User.create({
                                name: userFb.name,
                                email: userFb.email,
                                authentication: 'fb-login',
                                password: 'default'
                            })
                                .then(user=>{
                                    let accessToken = jwtHelper.encode({
                                        id: user._id,
                                        name: user.name,
                                        email: user.email
                                    })
                                    res.status(200).json({accessToken})
                                })
                                .catch(err=>{
                                    res.status(400).json({errors: err.errors || err.message})
                                })
                        }
                    })
                    .catch(err=>{
                        res.status(400).json({errors: err.errors || err.message})
                    })
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static gsignin(req,res){
        client.verifyIdToken({
            idToken: req.body.gtoken,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
            .then(ticket=>{
                let payload = ticket.getPayload()
                // console.log(payload)
                User.findOne({
                    email: payload.email
                })
                    .then(user=>{
                        if(user){
                            let data = {
                                name: payload.name,
                                id: user._id
                            }
                            res.status(200).json({accessToken: jwtHelper.encode(data)})
                        } else {
                            User.create({
                                name: payload.name,
                                email: payload.email,
                                authentication: 'gsignin',
                                password: 'default'
                            })
                                .then(user=>{
                                    let accessToken = jwtHelper.encode({
                                        id: user._id,
                                        name: user.name,
                                        email: user.email
                                    })
                                    res.status(200).json({accessToken})
                                })
                                .catch(err=>{
                                    res.status(400).json({errors: err.errors || err.message})
                                })
                            
                        }
                    })
                    .catch(err=>{
                        res.status(400).json({errors: err.errors || err.message})
                    })
            })
    }
    
}

module.exports = Controller