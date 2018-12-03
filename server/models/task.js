var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    name: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    },
    due_date: String
});


var Task = mongoose.model('Task', taskSchema)

module.exports = Task