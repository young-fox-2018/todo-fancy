const jwt = require('jsonwebtoken');

module.exports = {
    getToken(data) {
        return jwt.sign(data, process.env.SECRET_JWT);
    },

    verifToken(data, callback) {
        jwt.verify(data, process.env.SECRET_JWT, function(err, decoded) {
            if(err) {
                callback(err);
            }else{
                callback(null, decoded);
            }
        });
    }
}