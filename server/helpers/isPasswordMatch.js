const bcrypt = require('bcrypt');

function isPasswordMatch(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = isPasswordMatch