const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateJsonToken(userData) {
    return jwt.sign(userData, process.env.jwt_secret)
}

module.exports = generateJsonToken