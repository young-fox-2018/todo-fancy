"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  login: String
})

const User = mongoose.model('User', userSchema);

// userSchema.path('email').validate(function(email, next) {
//   User.findOne( {
//     email: email
//   }, function (err, user) {
//     if (user) {
//       throw new Error('Email is not unique')
//     } else {
//       next()
//     }
//   })
//   }, "email is not unique")



module.exports = User