const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({    
    email: {
        type: String,
        validate: [function(email) {
            return new Promise( (resolve, reject) => {
                User.find({email: email}, function(err, user) {
                    if(!user.length) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
            });
        }, `Email already exists`]
    },
    password: String,
    provider: String,
    todos: [{type: Schema.Types.ObjectId, ref: 'Todo'}]
});

userSchema.pre('save', function(){
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;