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
    required: true
  }
})

module.exports = db.model('Todo', todoSchema)
