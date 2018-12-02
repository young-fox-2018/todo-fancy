const jwt = require('jsonwebtoken')

module.exports = {
    genToken: function(user){
        let token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET)
        return token
    }
}