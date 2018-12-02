const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
    hashPassword: (plainPass) => {
        return bcrypt.hashSync(plainPass, saltRounds);
    },

    checkPassword: (plainPass, dbPass) => {
        console.log(plainPass)
        return bcrypt.compareSync(plainPass, dbPass); 
    }
}
