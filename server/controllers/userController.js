const User = require('../models/user')
const ObjectId = require('mongodb').ObjectId
const bcryptHelper = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')


module.exports = {
    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    let isTrue = bcryptHelper.compare(req.body.password, user.password)
                    if (!isTrue) {
                        res.status(400).json({
                            message: `Your password is wrong!`
                        })
                    } else {
                        res.status(200).json({
                            msg: `Login succesfully`,
                            token: jwt.generate(user),
                            username: user.username
                        })
                    }
                } else {
                    res.status(400).json({
                        message: `Please use your valid email!`
                    })
                }
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                })
            })
    },
    register: (req, res) => {
        let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    User.create(newUser)
                        .then(user => {
                            res.status(200).json({
                                msg: `Succesfully register user!`,
                                data: user
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).json({
                                errors: err.errors
                            })
                        })
                } else {
                    console.log(`Emai has been used by another user!`)
                    res.status(400).json({
                        message: `Emai has been used by another user!`
                    })
                }
            })
            .catch(err => {
                res.status(400).json({
                    errors: err.message
                })
            })



    }
}