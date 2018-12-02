"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  login: String,
  taskList: [{type: Schema.Types.ObjectId, ref: 'Task' }]
})

const User = mongoose.model('User', userSchema);

module.exports = User