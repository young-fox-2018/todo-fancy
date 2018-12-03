const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: String,
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    members: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }]
}, { timestamps: true })

const Project = mongoose.model('Project', projectSchema)

module.exports = Project;