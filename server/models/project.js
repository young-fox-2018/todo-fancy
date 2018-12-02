const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    projectName: String,
    activity: [{
        type: String
    }],
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project