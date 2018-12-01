const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new mongoose.Schema({
  name : String,
  description : String,
  status : {
    type : String,
    enum : ['working', 'finish']
  },
  deadline : Date,
  userId : {
    type : Schema.Types.ObjectId,
    ref: 'User'
  },
  groupId : {
    type : Schema.Types.ObjectId,
    ref: 'Group'
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
