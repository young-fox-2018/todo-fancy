const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    members : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    name: {
        type: String,
        required: [true, 'project name is required']
    }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project