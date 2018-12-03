var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const helper = require('../helper/helper')

var userSchema = new Schema({
    username: String,
    email: String,
    password: {
        type: String,
        default: 'password'
    },
    provider: {
        type: String,
        default: 'none'
    }
    
})

userSchema.pre('save', function() {
    let hash = this.password
    this.password = helper.hashPassword(hash)
})

var User = mongoose.model('User', userSchema)

module.exports = User