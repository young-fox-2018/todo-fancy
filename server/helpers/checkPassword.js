const bcrypt = require('bcryptjs')

const checkPassword = function(password_input,password_database) {
    if (bcrypt.compareSync(password_input,password_database)) {
        return true
    } else {
        return false
    }
}

module.exports = checkPassword