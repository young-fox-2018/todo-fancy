const User = require('../models/user')
const bcrypt = require('bcryptjs')
const tokenGenerator = require('../helpers/tokenGenerator')

module.exports = {
    all: function(req, res, next) {
        User.find({}).populate('tasks')
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    signup: function(req, res, next) {
        let newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(newUser => {
                res.status(201).json({msg: 'sign up success', newUser})
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    signin: function(req, res, next) {
        if (req.googleSignin) {
            User.findOne({email: req.googleSignin.email})
                .then(user => {
                    if (!user) {
                        let token = tokenGenerator.generate({name: `${req.googleSignin.name}`, email: req.googleSignin.email})
                        res.status(200).json(token)
                        let newGoogleUser = {
                            firstName: req.googleSignin.given_name,
                            lastName: req.googleSignin.family_name,
                            username: `${req.googleSignin.given_name}_${req.googleSignin.family_name}`,
                            email: req.googleSignin.email,
                            password: `${req.googleSignin.given_name}123`
                        }
                        User.create(newGoogleUser)
                        .then(newUser => {
                            res.status(201).json({msg: 'sign up success', newUser})
                        })
                        .catch(err => {
                            res.status(400).json(err.message)
                        })
                    }
                    else {
                        let token = tokenGenerator.generate({name: `${req.googleSignin.name}`, email: req.googleSignin.email})
                        res.status(200).json(token)
                    }
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })


        }
        else {
            if (bcrypt.compareSync(req.body.password, req.signin.password)) {
                let token = tokenGenerator.generate({name: `${req.signin.firstName} ${req.signin.lastName}`, email: req.signin.email})
                res.status(200).json(token)
            }
            else {
                res.status(400).json({msg: 'incorrect pasword'})
            }  
        }
    },

    update: function(req, res, next) {
        const salt = bcrypt.genSaltSync(10)
        let hashPassword = bcrypt.hashSync(req.body.password, salt)
        let updatedData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        }
        User.updateOne({_id: req.params.userId}, updatedData)
            .then(updatedUser => {
                res.status(201).json({msg: 'update success', updatedUser})
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    },

    delete: function(req, res, next) {
        User.deleteOne({_id: req.params.userId})
            .then(result => {
                res.status(204).json({msg: 'user deleted', result})
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }
}