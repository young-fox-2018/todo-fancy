const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: 'Name must be filled',
    },
    description: {
        type: String,
        required: 'Description must be filled',
    },
    status: {
        type: String,
        default: 'start',
    },
    due_date: Date,
    isProject: {
        type: Number,
        default: 0,
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    member: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;