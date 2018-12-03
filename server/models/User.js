const mongoose = require('mongoose')
const bcryptHelper = require('../helpers/bcryptHelper')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'name minimum 3 characters'],
        required: [true, 'name is required']
    }, 
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: [{
            isAsync: true,
            validator: function(v, cb){
                setTimeout(function(){
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    var msg = v + ' is not a valid email'
                    cb(re.test(v), msg)
                }, 5)
            },
            message: 'Email is invalid'
        }, {
            isAsync: true,
            validator: function(v,cb){
                User.findOne({
                    email: v
                }, function(err, result){
                    var msg = `${v} is already taken, please pick another`
                    cb(!result, msg)
                })
            },
            message: 'email is already taken'
        }]
    },
    projectInvitations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }], 
    projectLists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'password must be at least 6 characters']
    },
    authentication: {
        type: String,
        default: 'general'
    }
})

userSchema.pre('save', function(next){
    this.password = bcryptHelper.encode(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User