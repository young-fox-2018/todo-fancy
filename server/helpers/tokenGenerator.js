require("dotenv").config()

function tokenGenerator(userData) {
    const token = jwt.sign(userData)
    return token
}

module.exports = tokenGenerator