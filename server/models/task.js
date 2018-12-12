const mongoose = require("mongoose")
const Schema = mongoose.Schema

var taskSchema = new Schema({
    name: String,
    description: String,
    due_date: String,
    status: {
        type: Boolean,
        default: false
    }
});

var Task = mongoose.model('Task', taskSchema)

module.exports = Task