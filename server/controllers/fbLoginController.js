const User = require('../models/user')
const ObjectId = require('mongodb').ObjectId
const bcryptHelper = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const reqquest = require('request')


module.exports = {
    loginFb: (req, res) => {
        const option = {
            url: "https://graph.facebook.com/v3.2/me",
            json: true,
            qs: {
                fields: 'name,email',
                access_token: req.body.token
            }
        }
        request(option, (err, response, body) => {
            if (err) {
                res.status(400).json({
                    err: err.message
                })
            } else {
                User.findOne({
                    email: body.email
                }, (err, result) => {
                    if (err) {
                        res.status(400).json({
                            err: err
                        })
                    } else {
                        if (result) {
                            token = jwt.generate(result)
                            body.token = token
                            res.status(200).json(body)
                        } else {
                            User.create({
                                email: body.email,
                                name: body.name,
                                password: 'facebook',
                            }, (err, result) => {
                                if (err) {
                                    res.status(400).json({
                                        err: err
                                    })
                                } else {
                                    token = jwt.generate(body)
                                    body.token = token
                                    res.status(200).json(body)
                                }
                            })
                        }
                    }
                })
            }
        })
    }
}



// 'http://localhost:3000/fblogin'