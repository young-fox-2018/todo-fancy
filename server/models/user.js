var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const helper = require('../helper/helper')

var userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    provider: {
        type: String,
        default: 'none'
    },
    token: {
        type: String,
        default: ''
    }
    
})

userSchema.pre('save', function() {
    let hash = this.password
    this.password = helper.hashPassword(hash)
})

var User = mongoose.model('User', userSchema)

module.exports = User