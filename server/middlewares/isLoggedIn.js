const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user')

function isLoggedIn(req, res, next) {
    if (req.headers.accesstoken) {
        jwt.verify(req.headers.accesstoken, process.env.JWT_SECRET, (err, decoded) => {
            if (decoded) {
                User.findOne({ email: decoded.email })
                    .then(user => {
                        if (user) {
                            req.userID = user._id
                            next()
                        }
                        else {
                            res.status(400).json({ err, msg: 'you are not a registered user' })
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ err, msg: 'error from find one user' })
                    })
            }
            else {
                res.status(400).json({ err, msg: 'something wrong with the token decoding' })
            }
        })
    }
    else {
        res.status(400).json({ msg: 'accesstoken is not found' })
    }
}

module.exports = isLoggedIn