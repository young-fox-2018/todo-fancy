const bcrypt = require('bcrypt');

function bcryptCompare (password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = bcryptCompare