const mongoose = require('mongoose')
const db = require('./dbSetup')

const todoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    uppercase: true,
    enum: ['TODO', 'IN PROGRESS', 'DONE'],
    default: 'TODO',
  },
  dueDate: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 7)
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = db.model('Todo', todoSchema)
