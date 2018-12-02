const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
//helpers
const encrypt = require('../helpers/bcrypt')

class Controller {
    static signup(req, res) {
        encrypt(req.body.password)
            .then(hash => {
                //create User in DB
                User
                    .create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                    })
                    .then(user => {
                        res.status(201).json({message:"User created", data: user})
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: err.message, note: 'Please see console log for details' })
                    })
            })
            .catch((msg => {
                res.status(400).json({message: msg})
            }))
    }
    static signin(req, res) {
        //check password
        bcrypt.compare(req.body.password, req.user_signing.password, function(err, result) {
            if(err) {
                if(user.logintype === 'fb') {
                    res.status(400).json({ message: 'We have detected that you first signed in using Facebook. Please do so again to login.'})
                } else {
                    res.status(400).json({message: "Error in decrypting password. Please try again"})
                }
            } else {
                if(result) {
                    //give token
                    let content = {
                        name: req.user_signing.name,
                        email: req.user_signing.email,
                        projects: req.user_signing.projects
                    }
                    let token = jwt.sign(content, process.env.JWT_Secret)
                    res.status(200).json({message:"Sign in Success", token:token, name: req.user_signing.name})
                } else {
                    res.status(400).json({message: "Invalid Password"})
                }
            }
        });
    }
    static FBsignin(req, res) {
        User
            .findOne({
                email: req.fbdata.email
            })
            .then(user => {
                //if found, give JWT token right away
                if(user) {
                    let content = {
                        name: user.name,
                        email: user.email,
                        projects: user.projects
                    }
                    let token = jwt.sign(content, process.env.JWT_Secret)
                    res.status(200).json({ message: "Login success", token, name: user.name })
                } else {
                    //if not found, add to db and then give JWT token
                    return User
                            .create({
                                name: req.fbdata.name,
                                email: req.fbdata.email,
                                logintype: "fb"
                            })
                            .then(newUser => {
                                let token = jwtToken(newUser)
                                res.status(200).json({ message: "Login success", token, name: newUser.name})
                            })
                }
            })
            .catch(err => {
                console.log(err)    
                res.status(500).json({message: err.response.data.message, note: "Please see console for details"})
            })
    }
}

module.exports = Controller