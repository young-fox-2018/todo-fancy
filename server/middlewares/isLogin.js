const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()
const ObjectId = require('mongodb').ObjectID



module.exports = {
    isLogin: (req, res, next) => {
        let token = req.headers.token
        // console.log(token)
        if (token) {
            jwt.verify(token, process.env.secret, function (err, decoded) {
                if (err) {
                    res.status(400).json({
                        message: `Your token is invalid!`
                    })
                } else {
                    console.log(decoded.id)
                    // let id = ObjectId(decoded.id)
                    // console.log(id)
                    User.findOne({
                        _id: decoded.id
                    })
                        .then(user => {
                            if (user) {
                                req.decoded = user
                                next()
                            } else {
                                res.status(400).json({
                                    message: `Username is not found!`
                                })
                            }
                        })
                        .catch(err => {
                            res.status(400).json({
                                message: err.message
                            })
                        })
                }
            })
        } else {
            res.status(400).json({
                message: `You dont have access token!`
            })
        }

    }
}