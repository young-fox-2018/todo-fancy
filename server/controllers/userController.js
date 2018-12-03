const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {compareCrypt} = require('../helpers/bcrypt')
const axios = require('axios')
const generator = require('generate-password');
require('dotenv').config()

class UserController {
    static register(req, res) {
        console.log("ini controller register")
        console.log(req.body)
        let user = new User({
            username:  req.body.username,
            email: req.body.email,
            password: req.body.password,
            loginSource: "manual"
        })
        user.save()
            .then(result => {
                console.log(result)
                res.status(200).json(result)
            })
            .catch(err => {
                console.log("masuk sini ga???????")
                console.log(err)
                res.status(400).json(err.errors.email)
            })
    }

    static login(req, res) {
        console.log("masuk controller login")
        User.findOne({
            email: req.body.email
        })
            .then((user) => {
                // console.log(user)
                if (!user) {
                    console.log("masuk ke user not found !user")
                    res.status(400).json({message: "user not found, please register first"})
                } else {
                    if(user.loginSource != "manual") {
                        console.log("login nya bukan pake manual")
                        res.status(400).json({message: `previously you register with ${user.loginSource}, please login with ${user.loginSource}`})
                    }else{
                        if (compareCrypt(req.body.password, user.password)){
                            console.log("loginnya manual")
                            let token = jwt.sign({ id: user._id }, process.env.userSecretJWT);
                            console.log(token)
                            res.status(200).json(token)
                        } else {
                            console.log("loginnya manual tp salah password or email")
                            res.status(400).json({message: "email or password is incorrect"})
                        }                
                    }
                }
            })
            .catch((err) => {
                console.log("masuk catch controller login")
                res.status(400).json(err.message)
            })
    }

    static loginFB(req, res) {
        console.log('ini controller loginFB',req.body.accessToken)
        axios({
            method: 'GET',
            url: `https://graph.facebook.com/v3.2/me?fields=id,name,email&&access_token=${req.body.accessToken}`
        })
            .then(function (response) {
                console.log(response.data)
                User.findOne({
                    email: response.data.email
                })
                    .then((user) => {
                        console.log('ini user',user)
                        
                        if (!user) {
                            console.log("kalo user null masuk sini")
                            // res.status(400).json({message: "user not found"})
                            let user = new User({
                                username: response.data.name,
                                email: response.data.email,
                                password: generator.generate({
                                    length: 10
                                }),
                                loginSource: "facebook"
                            })
                            user.save()
                                .then(result => {
                                    let token = jwt.sign({ id: result._id }, process.env.userSecretJWT);
                                    console.log(token)
                                    res.status(200).json(token)
                                })
                                .catch(err => {
                                    console.log('ini errorrrr~~~~')
                                    res.status(400).json(err.message)
                                })        
                        }else {
                            if(user.loginSource != "facebook") {
                                res.status(400).json({message: `previously you register ${user.loginSource}, please login with ${user.loginSource}`})
                            } else {                                
                                let token = jwt.sign({ id: user._id }, process.env.userSecretJWT);
                                console.log(token)
                                res.status(200).json(token)            
                            }
                        }
                    })
                    .catch((err) => {
                        console.log('ini errorloginfb then', err.message)
                        res.status(400).json(err.message)
                    })
            })
            .catch(function (error) {
                console.log('error axios',error.response);
            });
    }
}

module.exports = UserController