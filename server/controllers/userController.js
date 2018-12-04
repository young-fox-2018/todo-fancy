const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('../helpers/tokenGenerator')

module.exports = {
    signUp: function(req,res,next) {
        let newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password
        }
        User.create(newUser)
        .then(user => {
            let token = jsonwebtoken({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                userName: req.body.userName
            })   
            res.status(201).json(token)
            })
            .catch(err => {
            console.log(err)
                res.status(400).json({
                    msg: err.message
                })
            })  
    },
    signIn: function(req, res, next) {
        console.log('l,mjmmjm', req.body);
        // if(!req.body.username) {
            User.findOne({ email: req.body.email }) 
                .then(function(loggedUser) {
                    
                    if(bcrypt.compareSync(req.body.password, loggedUser.password)){
                        let token = jsonwebtoken({
                            firstName: loggedUser.firstName,
                            lastName: loggedUser.lastName,
                            email: loggedUser.email,
                            username: loggedUser.userName
                        })
                        console.log(token);
                        res.status(200).json(token)
                    } else {
                        res.sttus(400).json('Wrong password')
                    }
                })
                .catch(err => {
                    res.status(400).json('Email not found, please register first')
                })
        // } else if (!req.body.email) {
            // User.findOne({ userName: req.body.username })
            //     .then(function(loggedUser) {
            //         if(bcrypt.compareSync(req.body.password, loggedUser.password)){
            //             let token = jsonwebtoken({
            //                 firstName: loggedUser.firstName,
            //                 lastName: loggedUser.lastName,
            //                 email: loggedUser.email,
            //                 username: loggedUser.userName
            //             })
            //             res.status(200).json(token)
            //         } else {
            //             res.sttus(400).json('Wrong password')
            //         }
            //     })
            //     .catch(err => {
            //         console.log(err)
            //         res.status(400).json('Username not found, please register first')
            //     })
        // }
    }
}