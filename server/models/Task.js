const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    description: {
        type: String,
        minlength: 5
    },
    iscomplete: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', taskSchema) 
module.exports = Task