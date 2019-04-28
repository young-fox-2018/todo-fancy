var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
    hashPassword: (password) => {
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    checkPassword: (password, hashedPassword) => {
        return bcrypt.compareSync(password, hashedPassword)
    },
    generateToken: (input) => {
        return jwt.sign(input, process.env.TOKEN_JWT);
    },
    verifyToken: (token) => {
        try {
            let data = jwt.verify(token, process.env.TOKEN_JWT);
            return data
        } catch(err) {
        // err
            return {
                message: err.message
            }
        }
    }
}