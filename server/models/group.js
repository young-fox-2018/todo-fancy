const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    name: String,
    members: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Task'
    }]
})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group