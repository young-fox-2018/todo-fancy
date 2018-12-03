const User = require('../models/User')
const checkPassword = require('../helpers/checkPassword')
const generateToken = require('../helpers/generateToken')

class UserController {

    static newUser(req, res) {
        let dataUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            usergoogle: false,
            task: []
        }
        User.create(dataUser)
            .then(function() {
                res.status(200).json({
                    message: "Successfully register new user"
                })
            })
            .catch(function(err) {
                console.log(err)
                res.status(400).json({
                    error: err.message
                })
            })
    }

    static loginEmail(req, res) {
        User.findOne({email:req.body.email})
            .then(function(user) {
                const correctPassword =  checkPassword(req.body.password, user.password)
                if (correctPassword) {
                    const Token = generateToken(user)
                    res.status(200).json({
                        token: Token,
                        message: `${user.username} Login success`
                    })
                } else {
                    res.status(401).json({
                        error: 'Invalid email or password'
                    })
                }
            })
            .catch(function(err) {
                res.status(500).json({
                    error: err.message
                })
            })
    }

}

module.exports = UserController