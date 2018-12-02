const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: "Name is Required"},
    email: { 
        type: String, 
        required: "Email Address is Required", 
        unique: "Email already exist",
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {type: String, required: "Password is Required"}
})

const User = mongoose.model('User',userSchema);
module.exports = User;
