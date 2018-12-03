const bcrypt = require("bcrypt")
const saltRounds = 10;

function encrypt(pass) {
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(pass, salt);
    return hash
}

module.exports = encrypt