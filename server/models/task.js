const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String,
        required: 'to do name is required'
    },
    description: {
        type: String,
        required: 'to do description is'
    },
    status: {type: String, default: 'Uncomplete'},
    dueDate: Date,
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task