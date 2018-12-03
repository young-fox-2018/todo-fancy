const jwtHelper = require('../helpers/jwtHelper')

function isLogin(req,res,next){
    console.log(req.headers)
    if(req.headers.accesstoken){
        let decoded = jwtHelper.decode(req.headers.accesstoken)
        req.decoded = decoded
        next()
    } else {
        res.status(403).json({errors: {auth: {message: 'Forbidden, need accesToken'}}})
    }
}

module.exports = isLogin