const mongoose = require('mongoose')

const db = require('./dbSetup')
const { hash, compareHash } = require('../helpers')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    validate: (username, cb) => {
      User.findOne({ username }).exec()
        .then(user => cb(!user, `${username} is already used!`))
        .catch(err => {
          console.error(err.message)
          cb(false, "Database error")
        })
    }
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    validate: [{
      validator: email => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      },
      message: email => `${email.value} is not a valid email!`
    }, {
      isAsync: true,
      validator: (email, cb) => {
        User.findOne({ email }).exec()
          .then(user => cb(!user, `${email} is already used!`))
          .catch(err => {
            console.error(err.message)
            cb(false, "Database error")
          })
      }
    }]
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
})


userSchema.pre('save', function (next) {
  hash(this.password)
    .then(hash => {
      this.password = hash
      next()
    })
    .catch(err => next(err))
})


userSchema.methods.isPasswordMatch = function (userInput, cb) {
  // returning a promise
  return compareHash(userInput, this.password)
}

const User = db.model('User', userSchema)

module.exports = User
