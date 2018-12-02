const User = require('../models/User');
const isPasswordMatch = require('../helpers/isPasswordMatch');
const generateToken = require('../helpers/generateToken');
const verifyToken = require('../helpers/verifyToken');

module.exports = {
    getUser: function(req, res, next) {        
        const {token} = req.query;
        const {id} = verifyToken(token);
        
        User.findOne({_id: id}).populate('todos').exec(function(err, userDetail) {
            if(!err) {
                // console.log(userDetail, `userdetail=======`);

                res.status(200).json({
                    message: `Detail user todos`,
                    id: userDetail._id,
                    todos: userDetail.todos
                });
            } else {
                res.status(500).json({
                    message: `Error getting all users`,
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
        })
    }
}