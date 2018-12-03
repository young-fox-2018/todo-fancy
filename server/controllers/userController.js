const User = require('../models/User')
const {hashPassword, checkPassword, generateToken, verifyToken} = require('../helpers/helper')
const axios = require('axios')
module.exports = {
    register: (req, res) => {
        let {name, email, password} = req.body

        User.findOne({
            email: email
        })
            .then((result_user) => {
                console.log(result_user, '-=-=-=')
                if (!result_user) {
                    return User.create({
                        name,
                        email,
                        password
                    })
                } else {
                    res.status(401).json({
                        message: 'Email is used'
                    })
                }
            })
            .then((result_user) => {
                res.status(200).json(result_user)
            })
            .catch((err) => {
                res.status(401).json({
                    message: err.message
                })
            });
    },
    login: (req, res) => {
        let {email, password} = req.body

        User.findOne({
            email: email
        })
        .then((result_user) => {
            if (!result_user) {
                res.status(400).json({
                    message: "email not registered"
                })
            } else {
                if (checkPassword(password, result_user.password)) {
                    let data = {
                        _id: result_user._id,
                        name: result_user.name,
                        email: result_user.email
                    }

                    let newToken = generateToken(data)
                    res.status(200).json({token: newToken})
                } else {
                    res.status(400).json({
                        message: "wrong password"
                    })
                }
            }
        }).catch((err) => {
            res.status(400).json({
                message: err.message,
                err: err
            })
        });
    },
    verifyToken: (req, res) => {
        let token = req.headers.auth
        let data = verifyToken(token)
        
        User.findOne({
            email: data.email
        })
            .then((result_user) => {
                if(result_user){
                    // console.log(result_user)
                    res.status(200).json(data)
                } else {
                    res.status(400).json({
                        message: 'invalid token'
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    message: err.message
                })
            });
    },
    gLogin: (req, res) => {
        // res.json(req.query.token)
        let token = req.query.token
        let url = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
        let dataGoogle = {}
        axios({
            method:'get',
            url:url,
            responseType:'json',
            params: {
                id_token: token
            }
        })
        .then((response) => {
            // console.log(response.data)
            dataGoogle = {
                name: response.data.name,
                email: response.data.email
            }
            return User.findOne({
                email: dataGoogle.email
            })
        })
        .then((result_user) => {
            if(!result_user) {
                User.create({
                    name: dataGoogle.name,
                    email: dataGoogle.email,
                    
                    loginMethod: 'Google'
                }, function(err, user){
                    if (err) {
                        res.status(400).json({message: err.message})
                    } else {
                        res.status(200).json({
                            token: generateToken({
                                _id: user._id,
                                name: user.name,
                                email: user.email
                            })
                        })
                    }
                })
                // res.json('bisa')
            } else {
                if (result_user.loginMethod !== 'Google') {
                    res.status(400).json({message: 'This email is created by register'})
                } else {
                    // console.log(dataGoogle)
                    res.status(200).json({
                        token: generateToken({
                            _id: result_user._id,
                            name: result_user.name,
                            email: result_user.email
                        })
                    })
                }
            }
        })
        .catch((err) => {
            // console.log(err)
            res.status(400).json({message: err.response.data.message})
        });
        
    }
}