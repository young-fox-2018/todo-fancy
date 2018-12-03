const jwt = require('jsonwebtoken')

const generateToken  = function(user) {
    let token = jwt.sign({
        email: user.email,
        username: user.username,
        id: user._id
    }, process.env.JWT_SECRET)
    return token
}

module.exports = generateToken