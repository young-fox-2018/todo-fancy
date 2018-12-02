var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = require("./User")

var taskSchema = new Schema({
    title:   String,
    description: String,
    status: {type:String, default: "pending"},
    dueDate: Date,
    user: {type: Schema.Types.ObjectId, ref:"User"}
});

taskSchema.post("save", function(task, next){

        User.findByIdAndUpdate(task.user, 
            {$push:{taskList: task._id}},
            function(err,res){
                if(err) throw err
            })
    next()
})

taskSchema.post("remove", function(task, next){
    console.log("masuk hook")
 
    // User.findByIdAndUpdate(task.user, 
    //     {$push:{taskList: task._id}},
    //     function(err,res){
    //         if(err) throw err
    //     })
// next()
})



let Task = mongoose.model("Task", taskSchema)


module.exports = Task