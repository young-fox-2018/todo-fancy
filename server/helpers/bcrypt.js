const bcrypt = require('bcryptjs')

module.exports = {
    generatePassword: function(password) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash
    },
    checkPassword: function(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}
