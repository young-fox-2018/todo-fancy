const mongoose = require('mongoose')

const Schema = mongoose.Schema
const projectSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],  
})

const Project = mongoose.model('Project', projectSchema, 'Projects')

module.exports = Project