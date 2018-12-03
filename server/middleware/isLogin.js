const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    isLogin: function(req, res, next) {
        jwt.verify(req.headers.token, process.env.userSecretJWT, function(err, decoded) {
            if(err) {
                res.status(400).json({message: 'You are not login. Please login first'})
            } else {
                req.decoded = decoded
                next()
            }
        });
    }
}