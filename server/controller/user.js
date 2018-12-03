const User = require('../models/user.js')
const helper = require('../helper/helper')
const axios = require('axios')
module.exports = {
    register: (req, res) => {
        console.log(req.body)
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
            .then(result => {
                res.status(201).json({
                    result: result,
                    message: "Successfully added to list!"
                })
            })
            .catch(err => {
                res.status(400).json({err: err})
            })
    }, 
    login: (req, res) => {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user) {
                    console.log(user)
                    if (helper.comparePassword(req.body.password, user.password)) {
                        let token = helper.generateToken({
                            id: user._id,
                            email: user.email
                        })
                        res.status(200).json({
                            msg: "Sign successfull",
                            token: token
                        })
                    } else {
                        res.status(400).json({
                            msg: "Wrong password!"
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: "Email not found!"
                    })
                }
            })
            .catch(err => {
                res.status(400).json({err: err})
            })
    },
    loginFB: function(req, res) {
        axios({
            method:'get',
            url:`https://graph.facebook.com/me?fields=id,email&access_token=${req.body.token}`
        })
            .then(function (response) {
                res.status(200).json({
                    msg: "Sign successfull",
                    token: token
                })
            })
            .catch(function(err) {
                res.status(400).json({err})
            })
    }
}