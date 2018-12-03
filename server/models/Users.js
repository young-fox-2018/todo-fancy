var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {encrypt,checkPassword} = require('../helpers/helper.js')

const UserSchema = new Schema({
    name:   {
        type: String,
        required: [true,'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        // unique: [true, 'email already exist'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email']
    },
    password: {
      type: String
    },
    loginBy: String,
    todoList: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
})

UserSchema.pre('save',function(next){
    if(this.password){
        this.password = encrypt(this.password)
    }
    next()
})

const User = mongoose.model("User",UserSchema)

module.exports = User