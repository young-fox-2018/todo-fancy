const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'task name is required']
    }, 
    description: {
        type: String,
        minlength: [5, 'Description minimum 5 characters']
    },
    due_date: {
        type: Date,
        required: [true, 'Due date is required']
    },
    status: {
        type: Boolean,
        default: false
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task