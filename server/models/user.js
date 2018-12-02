const mongoose = require('mongoose')
const Schema = mongoose.Schema
const helper = require('../helpers/helper')

const UserSchema = new Schema({
    email: String,
    password: String,
    methodLogin: String,
    projectId: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }]
})

UserSchema.pre('save', function(next) {
    this.password = helper.encrypt(this.password)
    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User

