const User = require('../models/user')
const axios = require('axios')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const helper = require('../helper/helper')
module.exports = {
    decodeFb: function(req, res, next) {
        axios({
            method:'get',
            url:`https://graph.facebook.com/me?fields=id,email&access_token=${req.headers.token}`
        })
            .then(function (response) {
                req.email = response.data.email
                next()
            })
            .catch(function(err) {
                res.status(400).json({err: err.message})
            })
    },
    findOne: function(req, res, next) {
        console.log("masuk findOne")
        User.findOne({
            email: req.email
        })
            .then(user => {
                if (user) {
                    return user
                } else {
                    return User.create({
                        username: 'fb',
                        email: req.email,
                        provider: 'fb'
                    })
                }
            })
            .then(newUser => {
                req.id = newUser._id
                console.log(newUser)
                next()
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    },
    decode: function(req, res, next) {
        console.log("masuk decode")
        let decoded = helper.decodeToken(req.headers.token)
        req.id = decoded.id
        req.email = decoded.email
        next()
    }
}