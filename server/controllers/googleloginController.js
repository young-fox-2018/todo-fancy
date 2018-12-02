const User = require('../models/user')
const helper = require('../helpers/helper')

module.exports = {
    login: (req, res) => {
        User.findOne({
            email: req.body.email
        }, (err, data) => {
            if(err) {
                res.status(400).json({
                    err: err
                })
            } else {
                if(data) {
                    res.status(200).json({
                        token: helper.token(req.body),
                        email: data.email,
                        id: data._id
                    })
                } else {
                    User.create({
                        email: req.body.email,
                        password: 'google'
                    }, (err, data) => {
                        if(err) {
                            res.status(400).json({
                                err: err
                            })
                        } else {
                            res.status(400).json({
                                token: helper.token(req.body),
                                email: req.body.email,
                                id: data._id
                            })
                        }
                    })
                }
            }
        })
    }
}