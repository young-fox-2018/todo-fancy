const mongoose = require('mongoose');
const encryptPassword = require('../helpers/encrypt-password.js');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: String,
    email: String,
    password: {
        type: String,
        default: encryptPassword('12345'),
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;