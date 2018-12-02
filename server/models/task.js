const mongoose = require('mongoose')
const Schema = mongoose.Schema

var taskSchema = new Schema({
    name: {
      type      : String,
      minLength : 5,
      maxLength : 12,
      required  : true
    },
    description : String,
    completed   : String,
    due_date    : String,
    UserId      : [
      {type: Schema.Types.ObjectId, ref: 'User'}
    ]
})
var Tasks = mongoose.model('Task', taskSchema);
module.exports = Tasks
