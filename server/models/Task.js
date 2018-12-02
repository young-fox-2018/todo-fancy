const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/User')

const taskSchema = Schema({
  name: String,
  dueDate: Date,
  status: {
    type: String,
    default: "On Progress"
  },
  description: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

taskSchema.post('save', function(newTask, next){
  User.findByIdAndUpdate(newTask.user,{"$push": {"taskList": newTask._id}}, function(err){
    if(err){
      throw(new Error(err.message))
    }
    next()
  })
})

// taskSchema.post('findOneAndDelete', function(task){
//   console.log("Masuk sini loh")
//   User.findByIdAndUpdate(task.user,{"$pull": {"taskList": task._id}}, function(err){
//     if(err){
//       throw(new Error(err.message))
//     }
//   })
// })

// taskSchema.pre('remove', function(task, next){
//   User.findByIdAndDelete(newTask.user,function(err, task){
//     if(err){
//       throw(new Error(err.message))
//     }
//     console.log("masuk hooks loh")
//     next()
//   })
// })

const Task = mongoose.model('Task', taskSchema);


module.exports = Task