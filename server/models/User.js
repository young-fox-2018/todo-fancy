var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require("../helpers/bcrypt")

var userSchema = new Schema({
    name:   String,
    email: String,
    password: String,
    provider: String,
    taskList: [{type: Schema.Types.ObjectId, ref:"Task"}]
});

userSchema.pre("save", function(next){
    if(this.provider !== "facebook"){
        this.password = bcrypt.hashPassword(this.password)
    }

    next()
})

userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
}, 'Email is not on the right format.')

let User = mongoose.model("User", userSchema)

userSchema.path('email').validate(function (email) {

    return new Promise(function(resolve, reject) {
        User.find({
            email: email
        }, function(err, User){
            if(err){
                console.log('a')
                throw new error(err);
                
            }
            else if(User.length > 0){
                console.log('b')
                // throw new Error('Need to get a Turbo Man for Christmas');
                // return false
                resolve(false)
            }else{
                resolve(true)
                // return true
            }
        })
    })

    
}, 'The e-mail is already registered')


module.exports = User