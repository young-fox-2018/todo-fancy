const User = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const ObjectId = require('mongoose').Types.ObjectId
const jwttoken = require('../helpers/jwttoken')
const request = require('request')

module.exports =  {
        createUser: function(req, res) {
            let newUser = User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.generatePassword(req.body.password)
            })
            newUser.save(function(err) {
                if (err) res.status(400).json({err:err.message})
                else {
                    res.status(200).json({
                        message: `Successfully add user ${req.body.name}`,
                        newUser: newUser
                    })
                }
            })
        },
        login: function(req, res) { // ngelempar token ke client, mau lempar id ga??
            User.find({email:req.body.email}, function(err, user) {
                if (err) res.status(400).json({err:err.message}) 
                else { 
                    if (user.length > 0) {
                        if (bcrypt.checkPassword(req.body.password, user[0].password)) {
                           let token = jwttoken.createToken(user[0]._id, user[0].name, user[0].email)
                           res.status(200).json({
                               token: token,
                               message: "Successfully login",
                            })
                        } else {
                            res.status(400).json({message: 'Username/Password is Wrong'})
                        }
                    } else {
                        res.status(400).json({message: 'User not found'})
                    }
                }
            })
        },
        facebookLogin: function(req, res) {
            // console.log(req.body)
            const options = {
                url:  `https://graph.facebook.com/v3.2/me?`,
                // source: https://developers.facebook.com/docs/graph-api/using-graph-api#reading
                json: true,
                qs: {
                    fields:"id,name,email",
                    access_token:`${req.body.fbtoken}`
                }
            }
            request(options, function(err, response, body) {
                // console.log(body, "INI BODYYY")
                 if (err) res.status(400).json({err:err.message})
                 else {
                     User.find({email:body.email}, function(err, user) {
                         if (err) res.status(400).json({err:err.message});
                         else {
                            //   console.log(user, "INI USERR")
                              if (user.length == 0) {
                                    // Create new User
                                    // console.log("MASUKK")
                                    let newUser = User({
                                        name: body.name,
                                        email: body.email,
                                        password: bcrypt.generatePassword("12345")
                                    })
                                    //  console.log(newUser)
                                    newUser.save(function(err) {
                                        if (err) res.status(400).json({err:err.message})
                                        else {
                                            let token = jwttoken.createToken(newUser._id, newUser.name, newUser.email)
                                            res.status(200).json({
                                                message:`successfully created user ${body.name}`,
                                                userdata: newUser,
                                                token:token
                                            })
                                        }
                                    })
                              }
                               else {
                                    let token = jwttoken.createToken(user[0]._id, user[0].name, user[0].email)
                                    res.status(200).json({
                                        token:token,
                                    })
                               }
                         }
                     })
                 }
            })
        }

}
