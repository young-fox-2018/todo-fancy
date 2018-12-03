var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { encrypt } = require('../helpers/bcrypt')

var userSchema = new Schema({
    username:  {
        type: String,
        required: [true, 'username should not be empty']
    },
    email: {
        type: String,
        required: [true, 'email must be filled'],
        validate: [{
            validator: function(value) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value)
            }, 
            message: `Please enter a valid email`
        }, { 
            validator : function(value, cb) {
                return new Promise( function(resolve, reject) {
                    User.findOne({ 
                      email : value 
                    }, function(err, data){
                        if(err) throw error
                        else{
                            if (data){
                                reject(false)
                            }else{
                                console.log('data email not exist on db')
                                resolve(true)
                            }
                        }
                    })
                })
            },
            message: 'Email already been used'
        }]
    },
    password: {
        type: String,
        required: [true, 'password should not be empty']
    },
    loginSource: String
});

userSchema.pre('save', function(next){
    this.password = encrypt(this.password)
    next()
})

var User = mongoose.model('User', userSchema);

module.exports = User