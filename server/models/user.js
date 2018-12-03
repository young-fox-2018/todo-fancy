var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var userSchema = new Schema({
    email: {
        type: String,
        required: 'Email is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: String,
    phone: {
        type: String,
        minlength: [11, 'phone number minimal 11 digits'],
        maxlength: [14, 'phone numbers maximal 14 digits']
    },
    firstName: String,
    lastName: String,
    gender: String,
    birthdate: Date,
    todo: [{ type: Schema.Types.ObjectId, ref: 'Todo'}],
    provider: {
        type: String,
        default: 'manual'
    }

});

var User = mongoose.model('User', userSchema)

User.schema.path('email').validate(function (value, respond) {                                                                                           
    User.findOne({ email: value }, function (err, user) {                                                                                                
        if(user) return(false);
        else return(true)                                                                                                                        
    });                                                                                                                                                  
  }, 'This email address is already registered');

 module.exports = User