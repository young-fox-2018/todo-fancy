const mongoose = require("mongoose")
const Schema = mongoose.Schema

var taskSchema = new Schema({
    name: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    },
    due_date: Date
});

var Task = mongoose.model('Task', taskSchema)
