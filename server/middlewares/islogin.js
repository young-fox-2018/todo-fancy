const jwt = require('jsonwebtoken')
const User = require('../models/User')

const islogin = function(req ,res ,next) {
    if (!req.headers.token){
        res.status(401).json({
            error: "login first"
        })
    } else {
        let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        User.findOne({email:decoded.email})
        .then(function(user) {
            req.userlogin = {
                username: user.username,
                email: user.email,
                id: user._id
            }
            next()
        })
        .catch(function(err) {
            res.status(500).json({
                error: err.message
            })
        })
    }

}

module.exports = islogin