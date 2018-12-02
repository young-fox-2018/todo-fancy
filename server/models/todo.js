const mongoose = require('mongoose')

const Schema = mongoose.Schema
const toDoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Done"]
    },
    created_date: {
        type: String //using moment.js
    },
    due_date: {
        type: String, //using moment.js
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
		required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    }   
})

const toDo = mongoose.model('Todo', toDoSchema, 'ToDos')

module.exports = toDo