const jwt = require('jsonwebtoken');

function generateToken(id, email){
    return jwt.sign({id: id, email: email}, process.env.SECRET);
}

module.exports = generateToken;