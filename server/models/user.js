const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('../helpers/bcrypt')


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username must be filled!']
    },
    email: {
        type: String,
        unique: [true, 'Email was already exist'],
        required: [true, 'Email must be filled!'],
        validate: {
            validator: function (value) {
                return new Promise((resolve, reject) => {
                    User.find({ email: value }, (err, user) => {
                        if (user.length > 0) {
                            reject('Email already exist!')
                        } else {
                            resolve()
                        }
                    })
                })
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Password must be filled!'],
        minlength: [3, `Minimum length 3`],
        maxlength: [10, `Maximum length 10`]
    }
})

userSchema.pre('save', function (next) {
    this.password = bcrypt.hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User 