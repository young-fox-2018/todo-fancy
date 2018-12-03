const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const validateEmail = require('../helpers/emailValidator')

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        validate: [
            {validator: function(username) {
                return new Promise(function(resolve, reject) {
                    User.findOne({username: username})
                        .then(user => {
                            if (user) reject(false)
                            else resolve(true)
                        })
                })
            }, msg: 'username already exist'}
        ]
    },
    email: {
        type: String,
        required: 'Email address is required',
        validate: [
            {validator: validateEmail, msg: 'Please fill a valid email address'},
            {validator: function(email) {
                return new Promise(function(resolve, reject) {
                    User.findOne({email: email})
                        .then(user => {
                            if (user) reject(false)
                            else resolve(true)
                        })
                })
            }, msg: 'email already exist'}
        ]
    },
    password: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
})

userSchema.pre('save', function(next) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User