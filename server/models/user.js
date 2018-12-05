const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return new Promise(function (resolve, reject) {
                    User.find({ email: value }, function (err, users) {
                        if (users.length == 0) {
                            resolve(true);
                        } else {
                            resolve(false)
                        }
                    });
                });
            }
        }
    },
    photo: String,
    todo: [],
    password: {
        type: String,
        required: true
    }
})

var User = mongoose.model('User', UserSchema)

module.exports = User