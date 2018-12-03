const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")
// const validateEmail = require("../helpers/emailValidation")

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
                            console.log('masuk')
                        })
                })
            }, msg: 'Username is already exist'
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is filled'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        
    },
    password: {
        type: String,
        required: [true, 'Password must be filled']
    },
    tasks: [{
        type: Schema.Types.ObjectId, ref: 'Task'
    }]
})
userSchema.pre('save', (next) => {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User

