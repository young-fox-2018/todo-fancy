const bcryprt = require('bcryptjs')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        minlength: 5,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [{
            isAsync: true,
            validator: function(value, callback) {
                User
                    .findOne({
                        email:value
                    }, function(err, doc) {
                        callback(!doc)
                    })
            },
            msg: "Email already used"
        }]
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 20,
        required: true
    },
    userGoogle: {
        type: Boolean
    },
    tasks: {
        type: Array
    }
})

userSchema.pre('save', function(next) {
    this.password = bcryprt.hashSync(this.password, 10)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User