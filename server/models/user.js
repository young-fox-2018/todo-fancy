const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: {
            validator: function(value) {
                return /\w+@+\w+\.\w/.test(value)
            },
            message: "Please insert a valid mail"
        },
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project',
    }]
})

const User = mongoose.model('User', userSchema, 'Users')

module.exports = User