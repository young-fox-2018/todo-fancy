const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name can't be blank"]
    },
    email: {
        type: String,
        validator: function (value) {
            return new Promise(function (resolve, reject) {
                User.find({ email: value.email }, function (err, users) {
                    if (users.length > 0) {
                        reject('Email already exist');
                    } else {
                        resolve(false)
                    }
                });
            });
        },
        lowercase: true,
        required: [true, "email can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    password: {
        type: String,
        required: [true, "password can't be blank"]
    }
});
const Users = mongoose.model("Users", userSchema);
module.exports = Users
