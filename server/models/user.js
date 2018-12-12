const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")
const validateEmail = require("../helpers/emailValidation")

const userSchema  = new Schema({
    firstName: {
        type: String,
        require: [true, 'First name must be filled']
    },
    lastName: {
        type: String,
        require: [true, 'Last Name must be filled']  
    },
    userName: {
        type: String,
        require: [true, 'Username must be filled'],
        validate: {
            validator: function(username) {
                return new Promise(function(resolve, reject) {
                    User.findOne({username: username})
                        .then(function(response) {
                            if (response) {
                                reject(false)
                            } else {
                                resolve(true)
                            }
                        })
                        .catch(function(err){
                            reject(false)
                        })
                })
            }, msg: 'Username is already exist'
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Email address is filled']
    },
    password: {
        type: String,
        required: [true, 'Password must be filled']
    },
    tasks: [{
        type: Schema.Types.ObjectId, ref: 'Task'
    }]
})
userSchema.pre('save', function (next) {
    // const salt = bcrypt.genSaltSync(12)
    console.log(this.password);
    
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User

