const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: String,
    dueDate: {type: Date, default: null},
    priority: Boolean,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

