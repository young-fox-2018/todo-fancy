"use strict"

const User = require('../models/User')
const hash = require('../helper/hash')
const jwt = require('../helper/jwt')


module.exports = {
    register: (req, res) => {
        User.create( {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash.hashPassword(req.body.password)
        }, (err, user) => {
            if (err) {
                res.status(501).json( {
                    error: err,
                    msg: "Please try again later"
                })
            } else {
                res.status(201).json( {
                    user:user
                })
            }
        })
    },

    login: (req, res) => {
        User.findOne( {
          email: req.body.email
        }, (err, user) => {
            if (err) {
                res.status(501).json( {
                    err:err,
                    msg: "please try again later"
                })
            } else {
                if (user) {
                    let match = hash.checkPassword(req.body.password, user.password)
                   
                    if (match) {
                        let obj = {
                            _id: user._id,
                            email: user.email
                        }
                        
                        res.status(200).json( {                 
                            token: jwt.generateToken(obj)
                        })
                    } else {
                        res.status(404).json( {
                            error: 'Password does not match'
                        })
                    }    
                } else {
                    res.status(404).json( {
                        error: "User does not exist"
                    })
                }
            }       
        })
    }
}