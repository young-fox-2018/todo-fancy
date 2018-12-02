const User = require("../models/User")
const ObjectID = require('mongodb').ObjectID
const bcrypt = require("../helpers/bcrypt")
const jwt = require("jsonwebtoken")
const request = require("request")

module.exports = {
    create: function(req,res,next){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, function(err, response){
            if(err) res.status(400).json({err: err.message})
            else{
                res.status(200).json({message: `you successfully registered with id ${response.id}`})
            }
        })
    },
    all: function(req,res,next){
        User.find({})
        .populate("taskList")
        .exec( function(err,users_data){
            if(err) res.status(400).json({err: err.message})
            else{
                res.status(200).json({data: users_data})
            }
        })
    },
    find: function(req,res,next){
        console.log(req.params.id, "==========")
        User.findOne({
            _id: ObjectID(req.params.id)
        })
        .populate("taskList")
        .exec( function(err,users_data){
            if(err) res.status(400).json({err: err.message})
            else{
                console.log(users_data)
                res.status(200).json({data: users_data})
            }
        })
    },
    signIn: function(req,res,next){
        User.findOne({
            email: req.body.email
        }, function(err,users_data){
            if(err){
                res.status(400).json({err: err.message})
            }
            else{
                
                if(!users_data){
                    res.status(400).json({err: "email is not found"})
                } else {
                    // res.json(users_data)
                    if(bcrypt.checkPassword(req.body.password, users_data.password)){
                        res.status(200).json({token: jwt.sign(users_data.email, process.env.jwtSecret)})
                    } else{
                        res.status(400).json({err: "incorrect password"})
                    }
                }
            }
        })
    },
    checkToken: function(req,res,next){
        console.log(req.body.token)
        let decodedMail = jwt.verify(req.body.token, process.env.jwtSecret)

        User.findOne({email: decodedMail})
        .populate("taskList")
        .exec(function(err, confirmedUser){
            if(err) res.status(400).json({err: err.message})
            else{
                if(!confirmedUser){
                    res.status(400).json({err: `user is not logged in`})
                } else{
                    console.log(confirmedUser)
                    let output = {
                        id: confirmedUser._id,
                        name: confirmedUser.name,
                        taskList: confirmedUser.taskList
                    }
                    res.status(200).json(output)
                }
            }
        }) 
    }
}