var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title:  String,
  description: String,
  status: {
    type : Boolean,
    default : false
  },
  dueDate : Date
});

const Todo = mongoose.model("Todo",TodoSchema)

module.exports = Todo