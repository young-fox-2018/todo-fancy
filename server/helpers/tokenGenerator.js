const jwt = require('jsonwebtoken')

module.exports = {
    generate: function(user) {
        return jwt.sign(user, process.env.jwtSecret)
    }
}