const mongoose = require('mongoose')
const db = require('./dbSetup')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  taskId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
})

module.exports = db.model('User', userSchema)
