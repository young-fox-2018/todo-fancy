const jwt = require('jsonwebtoken');

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
}

module.exports = verifyToken