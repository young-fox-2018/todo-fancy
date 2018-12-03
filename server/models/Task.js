var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title:  String,
    description: String,
    date: { type: Date },
    status: { type: Boolean, default: false }
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task