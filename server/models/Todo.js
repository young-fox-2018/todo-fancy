var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const todoSchema = new Schema({
    name: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    },
    dueDate: Date
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo