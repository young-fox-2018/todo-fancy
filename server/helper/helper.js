var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
    hashPassword: function(password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash
    },
    comparePassword: function(password, hash) {
        return bcrypt.compareSync(password, hash);
    },
    generateToken: function(data) {
        var token = jwt.sign(data, 'todo')
        return token
    },
    decodeToken: function(token) {
        var decoded = jwt.verify(token, 'todo');
        return decoded
    }
}