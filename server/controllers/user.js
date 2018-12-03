const User = require("../models/users")
const Encrypt = require("../helper/encrypt")
const bcrypt = require('bcrypt');
const jwt = require("../helper/jwt")
const axios = require('axios')

module.exports = {
    register: (req, res) => {
        let hash = Encrypt(req.body.password)
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        })
            .then((result) => {
                res.status(200).json({
                    result
                })

            }).catch((err) => {
                res.status(400).json({
                    err: err
                })
            });
    },
    login: (req, res) => {

        console.log(req.body);

        User.findOne({ email: req.body.email })
            .then((user) => {
                let isTrue = bcrypt.compareSync(req.body.password, user.password)
                if (isTrue) {
                    console.log("sss");
                    let data = {
                        name: req.body.name,
                        email: req.body.email
                    }
                    const token = jwt(data)
                    res.status(200).json(token)
                }
                else {
                    res.status(400).json({
                        msg: "password salah"
                    })
                }
            })
            .catch((err) => {
                res.status(400).json({
                    err: "email not found"
                })
            });
    },
    isLogin: (req, res) => {
        res.status(200).json({
            msg: "berhasil"
        })
    },
    fblogin: (req, res) => {
        console.log(req.query, "=>>>>");
        axios({
            method: 'GET',
            json: true,
            url: `https://graph.facebook.com/v3.2/me?fields=id,name,email&access_token=${req.query.acces_token}`,

        }).then((data) => {

            User.findOne({ email: data.data.email })
                .then((user) => {
                    console.log(user);
                    if (user) {
                        let userData = {
                            name: data.name,
                            email: data.email
                        }
                        let token = jwt(userData)
                        res.status(200).json({ token })
                    }
                    else {

                        let newUser = {
                            username: data.name,
                            password: null,
                            email: data.email
                        }
                        users.create(newUser)
                            .then(() => {
                                res.status(201).json({
                                    msg: "succes created"
                                })
                            }).catch((err) => {
                                res.status(400).json({
                                    error: err
                                })
                            });
                    }
                })
        }).catch((err) => {
            res.status(400).json({
                msg: err
            })
        });

    }

}

