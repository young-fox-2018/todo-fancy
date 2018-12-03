const jwt = require('jsonwebtoken')

const readToken = function(token) {
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
}

module.exports = readToken