const mongoose = require('mongoose')

var TaskSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    dueDate: String,
    isComplete: Boolean,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {
        type: Date,
        default: new Date()
    },
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
})

let taskGroup = mongoose.model('Task', TaskSchema)
module.exports = taskGroup

