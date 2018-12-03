const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    isLogin: function(req, res, next) {
        // console.log("ini isLogin")
        // console.log("ini reqheaders", req.headers) 
        jwt.verify(req.headers.token, process.env.userSecretJWT, function(err, decoded) {
            console.log("ini decoded", decoded)
            if(err) {
                console.log("ini err nya isLogin", err)
                res.status(400).json({message: 'You are not login. Please login first'})
            } else {
                console.log("ini else nya isLogin")
                req.decoded = decoded
                next()
            }
        });
    }
}