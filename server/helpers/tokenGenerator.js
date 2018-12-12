const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
require("dotenv").config()

function tokenGenerator(userData) {
    const token = jwt.sign(userData, process.env.JWT_SECRET)
    return token
}

module.exports = tokenGenerator