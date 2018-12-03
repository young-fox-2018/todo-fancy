var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const {hashPassword} = require('../helpers/helper')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [{
            validator: function(value) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(value).toLowerCase());
            },
            message: props => `${props.value} is not a valid email!`
        }, {
            validator: function(value) {
              return User.findOne({
                  email: value
              })
              .then((result_user) => {
                  if (result_user) {
                    throw Error('email is used')
                  }
              }).catch((err) => {
                  throw Error('error email validation')
              });
            },
            message: props => `${props.value} email is used!`
        }]
    },
    password: {
        type: String,
        minlength: [6, 'Minimum password is 6 char']
    },
    todos: [{
        type: ObjectId,
        ref: 'Todo'
    }],
    loginMethod: {
        type: String,
        default: 'Register'
    }
})

userSchema.pre('save', function(next) {
    if (this.loginMethod === 'Register') {
        this.password = hashPassword(this.password)
        next()
    } else {
        this.password = null
        next()
    }
});

const User = mongoose.model('User', userSchema)

module.exports = User