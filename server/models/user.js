var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const validateEmail = require('../helpers/validateEmail')

var userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Full Name must be filled'],
    },
    username: {
        type: String,
        required: [true, 'Username must be filled'],
        validate: {
            validator: function (username) {
                return new Promise(function (resolve, reject) {
                    User.findOne({ username: username })
                        .then(function (found) {
                            if (found) {
                                reject(false)
                            } else {
                                resolve(true)
                            }
                        })
                })
            }, msg: `username already exists`
        }
    },
    email: {
        type: String,
        required: [true, 'Email must be filled'],
        validate: [
            { validator: validateEmail, msg: `Please fill a valid email` },
            {
                validator: function (email) {
                    return new Promise(function (resolve, reject) {
                        User.findOne({ email: email })
                            .then(function (found) {
                                if (found) {
                                    reject(false)
                                } else {
                                    resolve(true)
                                }
                            })
                    })
                }, msg: `Email already exists`
            }
        ]
    },
    password: String,
    tasks: [{
        type: Schema.Types.ObjectId, ref: 'Task'
    }]
});

userSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User