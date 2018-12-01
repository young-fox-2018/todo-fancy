const User = require('../models/user.js')
const helper = require('../helper/helper')
module.exports = {
    register: (req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
            .then(result => {
                res.status(201).json({
                    result: result,
                    message: "Successfully added to list!"
                })
            })
            .catch(err => {
                res.status(400).json({err: err})
            })
    }, 
    login: (req, res) => {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user) {
                    if (helper.comparePassword(req.body.password, user.password)) {
                        let token = helper.generateToken({
                            id: user._id,
                            email: user.email
                        })
                        user.token = token
                        user.save()
                        res.status(200).json({
                            msg: "Berhasil login",
                            token: token
                        })
                    } else {
                        res.status(400).json({
                            msg: "Password salah"
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: "Email tidak terdaftar!"
                    })
                }
            })
            .catch(err => {
                res.status(400).json({err: err})
            })
    }
}