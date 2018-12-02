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
        console.log(req.body)
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                console.log(user)
                if (user) {
                    console.log(user)
                    if (helper.comparePassword(req.body.password, user.password)) {
                        console.log("masuk pak eko")
                        let token = helper.generateToken({
                            id: user._id,
                            email: user.email
                        })
                        res.status(200).json({
                            msg: "Berhasil login",
                            token: token
                        })
                    } else {
                        res.status(400).json({
                            msg: "Password salah"
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: "Email tidak terdaftar!"
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
              console.log(response)
            })
            .catch(function(err) {
                res.status(400).json({err})
            })
    }
}