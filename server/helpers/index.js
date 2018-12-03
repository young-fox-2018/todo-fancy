const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

function encrypt(password){
    return bcrypt.hashSync(password, salt)
}

function compare(password, passHash){
    return bcrypt.compareSync(password, passHash); 
}
function verifyToken(token){
    return jwt.verify(token, process.env.secret)
}

module.exports = {encrypt, compare, verifyToken}