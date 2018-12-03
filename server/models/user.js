const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, 'name must be filled']
    },
    email: {
        type: String,
        required: [true, 'email must be filled'],
        validate: [{
            validator: function(value) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
            }, 
            message: `Please enter a valid email`
        }, { 
            isAsync: true,
            validator: function(value, cb) {
                User.findOne({ email: value}, function (err, res) {
                    cb(!res) 
                })
            },
            message: `email is already registered`
        }] 
    },
    password: {
        type: String,
        required: [true, 'password must be filled']
    },
    isFacebook: {
        type: Boolean,
        default: false
    },
    invitations: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Project' 
    }],
    groups: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Project' 
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
