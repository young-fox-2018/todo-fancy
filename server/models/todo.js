var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    name: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    description: String,
    status: {
        type: Boolean,
        default: false
    },
    dueDate: Date
    
});

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo