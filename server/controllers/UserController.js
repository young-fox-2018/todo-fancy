const User = require('../models/User');
const isPasswordMatch = require('../helpers/isPasswordMatch');
const generateToken = require('../helpers/generateToken');
const verifyToken = require('../helpers/verifyToken');
const axios = require('axios');

module.exports = {
    getUser: function(req, res, next) {        
        const {token} = req.query;
        const {id} = verifyToken(token);
        
        User.findOne({_id: id}).populate('todos').exec(function(err, userDetail) {
            if(!err) {
                res.status(200).json({
                    message: `Detail user todos`,
                    id: userDetail._id,
                    todos: userDetail.todos
                });
            } else {
                res.status(500).json({
                    message: `Error getting all user data`,
                    error: err.message
                })
            }
        });
    },
    createUser: function(req, res, next) {
        const {email, password} = req.body;
        const newUser = { email, password };

        User.create(newUser, function(err, newUser) {
            if(!err) {
                const token = generateToken(newUser._id, newUser.email);                
                res.status(200).json({
                    message: `Success create new user`,                    
                    token
                })
            } else {
                res.status(500).json({
                    message: `Error create new user`,
                    error: err.errors.email.message
                });
            }
        });
    },
    deleteUser: function(req, res, next) {
        const {email} = req.body;

        User.deleteOne({email: email}, function(err, user){
            if(!err) {
                if(user.n === 1){
                    res.status(200).json({
                        message: `Success delete user with email ${email}`
                    });
                } else {
                    res.status(400).json({
                        message: `No user with email ${email}`
                    });
                }
            } else {
                res.status(500).json({
                    message: `Error delete user with email ${email}`,
                    error: err.message
                });
            }
        });
    },
    userLogin: function(req, res, next) {
        const {email, password} = req.body;

        User.findOne({email: email}, function(err, user){
            if(!err){
                if(user) {                    
                    if(isPasswordMatch(password, user.password)) {                    
                        const token = generateToken(user._id, user.email);
                        res.status(200).json({
                            message: `Successfully login`,
                            id: user._id,
                            token
                        });
                    } else {
                        res.status(400).json({
                            message: `Wrong password`
                        })
                    }
                } else {
                    res.status(400).json({
                        message: `User not found`
                    });
                }
            } else {
                res.status(500).json({
                    message: `Error finding user`,
                    error: err.message
                });
            }
        });
    },
    fbSignIn: function(req, res, next) {
        const access_token = req.body.token; 
        const options = {
            url: `https://graph.facebook.com/me?fields=id,name, email&access_token=${access_token}`,
            json: true,
            method: 'POST',
            headers: {
                'User-Agent': 'request'
            }
        };

        axios(options)
        .then(response => {
            User.findOne({email: response.data.email}), function(err, user) {
                if(!user) {
                    if(!user) {
                        User.create({email: response.data.email, provider: 'facebook'}, function(err, user) {
                            if(!err) {
                                const token = generateToken(user._id, user.email);
                                res.status(200).json({
                                    message: `Success create new user`,
                                    token
                                });
                            } else {
                                res.status(500).json({
                                    message: `Error create new user`
                                });
                            }
                        })
                    } else {
                        const token = generateToken(user._id, user.email);
                        res.status(200).json({
                            message: `Login with fb successfully`,
                            token
                        });
                    }
                } else {
                    res.status(500).json({
                        message:`Error finding user`,
                        error: err.message
                    });
                }
            }
        })
    }
}