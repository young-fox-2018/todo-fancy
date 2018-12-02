const crypto = require('crypto');

function encryptPassword(password) {
    return dataEncrypt = crypto.createHmac('sha256', process.env.SECRET_PASSWORD).update(password).digest('hex');
}

module.exports = encryptPassword;