const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
    token: (data) => {
        return jwt.sign({
            email: data.email
        }, process.env.SECRET)
    },
    encrypt: (password) => {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        return hash
    },
    compare: (password, input) => {
        return bcrypt.compareSync(input, password)
    }
}