const User = require("../models/User")
const ObjectID = require('mongodb').ObjectID
const bcrypt = require("../helpers/bcrypt")
const jwt = require("jsonwebtoken")
const request = require("request")

module.exports = {
    create: function(req,res,next){
        console.log("masuk control cre")
        // console.log(req.body.name, req.body.email, req.body.password)
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, function(err, response){
            if(err) {res.status(400).json({err: err.message}) 
            console.log("gagal", err.message)}
            else{
                
                res.status(200).json({msg: `you successfully registered with id ${response.id}`})
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
    },
    fbSignin: function(req,res,next){
        console.log(req.body.token)
        var options = {
            json: true,
            url: `https://graph.facebook.com/me?fields=email&access_token=${req.body.token}`,
            headers: {
                'User-Agent': 'request'
            },
            method: "GET"
          };
        
        request(options,function (error, response, body) {
            if (error) {
                console.log("EROR 1");
                res.status(400).json({err: error.message})
            } 
            else{
                // console.log("ini req ", body)
                let promise = new Promise(function(resolve, reject) {
                    User.findOne({
                        email: body.email
                    }, function(errFindOne, users_data){
                        console.log("data", users_data)
                        if (errFindOne) {
                            reject(errFindOne)
                        }
                        else if(users_data === null){
                            console.log("masuk create")
                            User.create({
                                email: body.email,
                                provider: "facebook"
                            }, function(err, response){
                                if(err) {
                                    console.log(err)
                                    reject(err)
                                } 
                                else{
                                    console.log(response)
                                }
                            })
                        } 
                        let token = jwt.sign(body.email, process.env.jwtSecret)
                        resolve(token)
                    })
                })   

                promise.then((token) => {
                    res.status(200).json({token: token})
                })
                .catch(err => {
                    res.status(400).json({err: err.message})
                })

            }
        } )
    }
}