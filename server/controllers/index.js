const User = require('../models/user')
const {encrypt, compare} = require('../helpers')
const jwt = require('jsonwebtoken')

module.exports = {
    login: function(req, res, next){
        User.findOne({
            email : req.body.email
        }, function(err, user){
            if(err){
                res.status(400).json(err.message)
            }else{
                if(user){
                    if(compare(req.body.password, user.password)){
                        var token = jwt.sign({
                            id: user._id, 
                            email: user.email
                        }, process.env.secret);
                        res.status(200).json({
                            msg : "user login", 
                            token: token
                        })
                    }else{
                        res.status(400).json("wrong password")
                    }
                }else{
                    res.status(400).json({
                        message: "User not found"
                    })
                }
            }
        }) 
    },
    register: function(req, res, next){
        let input = {
            email : req.body.email,
            password: encrypt(req.body.password),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            gender: req.body.gender,
            birthdate: req.body.birthdate
        }
        for(let key in input) {
            if(input[key] == undefined) delete input[key]
        }
        User.create(input, function(err,users){
            if(err){
                res.status(400).json(err)
            }else{
                var token = jwt.sign({
                    id: users._id, 
                    email: users.email
                }, process.env.secret);
                res.status(200).json({
                    msg : "Succesfull!! User registered",
                    token: token
                })
            }
        })
    }
}