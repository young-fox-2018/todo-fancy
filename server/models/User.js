const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    validate:{
        validator: function(email){
            return new Promise((resolve, reject)=> {
                User.findOne({email : email},function(err, docs) {
                    if(docs) {
                        reject(false)
                    }
                    else{
                        resolve(true)
                    }
                })
            })
        }, message:`Email has been used`
    }
},
  password: String,
  taskList: [{type: Schema.Types.ObjectId, ref: 'Task'}],
  provider: String
});

userSchema.pre('save', function(next) {
    const salt = bcrypt.genSaltSync(7)
    this.password = bcrypt.hashSync(this.password, salt)
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User