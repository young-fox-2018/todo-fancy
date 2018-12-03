const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

var todoSchema = new Schema({
    title: String,
    description: String,
    created_date: {
        type: Date,
        default: Date.now
    },
    due_date: Date,
    status: {
        type: String,
        default: 'unfinished'
    },
    user: { type: Schema.Types.ObjectId, ref: 'Todo'}
})
todoSchema.post('save', function(doc){
    User.findByIdAndUpdate(doc.user, { '$push': { 'todo': doc._id }}, function(err){
        if(err) throw new Error(err.message)
    })
})
todoSchema.post('findOneAndDelete', function(doc){
    User.findByIdAndUpdate(doc.user, { '$pull': { 'todo': doc._id }}, function(err){
        if(err) throw new Error(err.message)
    })
})

var Todo = mongoose.model('Todo', todoSchema)



module.exports = Todo