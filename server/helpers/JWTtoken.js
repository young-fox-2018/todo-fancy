const jwt = require('jsonwebtoken')
require('dotenv').config()


function getJWTtoken(data) {
    return jwt.sign(data, process.env.JWT_SECRET)
}


module.exports = { getJWTtoken }
