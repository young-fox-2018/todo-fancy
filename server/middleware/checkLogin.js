const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function checkLogin(req, res, next) {
    let token = req.headers.token

    if (token) {
        let decoded = jwt.verify(token, process.env.jwt_secret)
        User.findOne({ email: decoded.email })
            .then(function (user) {
                if (user) {
                    req.currentUser = user
                    next()
                } else {
                    res.status(400).json(`Please Login First!`)
                }
            })
            .catch(function (err) {
                res.status(400).json(err.message)
            })
    } else {
        let googleToken = req.headers.googletoken
        let decoded = jwt.verify(googleToken, process.env.jwt_secret)
        User.findOne({ email: decoded.email })
            .then(function (user) {
                if (user) {
                    req.currentUser = user
                    next()
                } else {
                    res.status(400).json(`Please Login First!`)
                }
            })
            .catch(function (err) {
                res.status(400).json(err.message)
            })
        //lh3.googleusercontent.com/-w3uAxj6B7-8/AAAAAAAAAAI/AAAAAAAAAA8/pG2eYfU5AT8/s96-c/photo.jpg
    }

}


module.exports = checkLogin