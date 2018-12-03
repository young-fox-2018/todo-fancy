const User = require('../models/User')
const objectId = require('mongodb').ObjectId
const {genToken} = require('../helpers/genToken')
const {checkPass} = require('../helpers/checkPass')
const {inputGen} = require('../helpers/inputGen')
const {verToken} = require('../helpers/verifyToken')
const axios = require('axios')

module.exports = {
    signUp: function(req, res, next){
        let input = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(input, function(err, newUser){
            if(err){
                res.status(500).json({
                    message: "Error in creating new Customer",
                    details: err.message
                })
            }
            else{
                let token = genToken(newUser)
                res.status(200).json({
                    message: "You have successfully signed up!",
                    token
                })
            }
        })
    },
    
    signIn: function(req, res, next){
        User.findOne({email: req.body.email}, function(err, user){
            if(err){
                res.status(500).json({
                    message: "Error inUser",
                    details: err.message
                })
            }
            else{
                if(user){
                    if(checkPass(req.body.password, user.password)){
                        let token = genToken(user)
                        res.status(200).json({token})
                    }
                    else{
                        console.log("WRONG PASSWORD SEHARUSNYS!@#!@$")
                        res.status(500).json({
                            message: "Wrong password!"
                        })
                    }
                }
                else{
                    res.status(500).json({
                        message:"Email not found!"
                    })
                }
            }
        })
    },

    allTask: function(req, res, next){
        let data = verToken(req.body.token)
        User.findOne({email: data.email}).populate('taskList').exec(function(err, user){
            if(err){
                res.status(400).json({
                    message: "Error in findAll task",
                    details: err.message
                })
            }
            else{
                res.status(200).json({
                    message: "Here's all the task you have",
                    details: user.taskList
                })
            }
        })
    },
    
    FBUser: function(req, res, next){
        var options = {
            url: `https://graph.facebook.com/v3.2/me?fields=id,name,email&access_token=${req.body.token}`,
            json: true,
            method: 'POST',
            headers:{
                'User-Agent': "request"
            }
        }
        axios(options)
        .then(response => {
            User.findOne({email: response.data.email}, function(err, user){
                if(err){
                    res.status(500).json({
                        message: "Errornya di fbUser findone",
                        details: err.message
                    })
                }
                else{
                    if(user){
                        let token = genToken(user)
                        res.status(200).json({token})
                    }
                    else{
                        let input = inputGen(response.data)
                        input.provider = "FB"

                        User.create(input, function(err, newFBUser){
                            if(err){
                                res.status(500).json({
                                    message:"Errornya di create new FBUser",
                                    details: err.response.data.message
                                })
                            }
                            else{
                                let token = genToken(user)
                                res.status(200).json({
                                    message:"created a new account using FB login",
                                    details: newFBUser,
                                    token
                                })
                            }
                        })
                    }
                }
            })   
        })
        .catch(err => {
            res.status(500).json({
                message: "Error in axios FB User",
                details: err.response.data.message
            })
        })
    }
}