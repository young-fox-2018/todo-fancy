const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jsonWebToken = require('../helpers/generateJsonToken')
const axios = require('axios')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("477287688203-9eatdimpvhm11441279erfgstekqfh9t.apps.googleusercontent.com");

module.exports = {
    findAll: function (req, res, next) {
        User.find({})
            .then(function (users) {
                res.status(200).json(users)
            })
            .catch(function (err) {
                res.status(400).json(err.message)
            })
    },
    signUp: function (req, res, next) {
        let newUser = {
            fullName: req.body.fullName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(function (user) {
                res.status(201).json(`user with username ${user.username} has been successfully created!`)
            })
            .catch(function (err) {
                res.status(400).json(err.message)
            })
    },
    signIn: function (req, res, next) {


        async function verify() {
            if (req.headers.googletoken) {
                console.log(req.headers)
                const ticket = await client.verifyIdToken({
                    idToken: req.headers.googletoken,
                    audience: "477287688203-9eatdimpvhm11441279erfgstekqfh9t.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
                    // Or, if multiple clients access the backend:
                    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
                });
                const payload = ticket.getPayload();

                const userid = payload['sub'];
                // If request specified a G Suite domain:
                //const domain = payload['hd'];
                User.findOne({ email: payload.email })
                    .then(function (userLogin) {
                        let token = jsonWebToken({
                            fullName: userLogin.fullName,
                            username: userLogin.username,
                            email: userLogin.email
                        })
                        console.log(token)
                        res.status(200).json(token)
                    })
                    .catch(function (err) {
                        res.status(400).json(`Wrong Email!`)
                    })
            } else {
                console.log('masuk manual')
                User.findOne({ email: req.body.email })
                    .then(function (userLogin) {
                        if (bcrypt.compareSync(req.body.password, userLogin.password)) {
                            let token = jsonWebToken({
                                fullName: userLogin.fullName,
                                username: userLogin.username,
                                email: userLogin.email
                            })
                            res.status(200).json(token)
                        }
                    })
                    .catch(function (err) {
                        res.status(400).json(`Wrong Email!`)
                    })
            }
        }
        verify().catch(console.error);
    }
}