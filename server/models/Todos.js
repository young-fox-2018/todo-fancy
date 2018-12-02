const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/User');

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    due_date: Date,
    status: {
        type: String,
        default: 'pending'
    },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

todoSchema.post('save', function(todo, next) {    
    User.findByIdAndUpdate(todo.user, {"$push": {'todos': todo._id}}, function(err, user) {
        if(err) throw err;        
    })
    next();
});

todoSchema.post('findOneAndDelete', function(todo) {
    User.findByIdAndUpdate(todo.user, {"$pull": {'todos': todo._id}}, function(err) {
        if(err) throw new Error(err.message);
    });
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;