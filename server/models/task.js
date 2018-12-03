const 	mongoose = require('mongoose'),
	User = require('./user.js')

const taskSchema = mongoose.Schema({
	title: {type:String, require:true},
	description: {type:String, require:true},
	status: {type:String, require:true, default:'not done'},
	targetDate: {type:Date, require:true},
	doneDate: {type:Date}
});

/*taskSchema.post('remove', function(task, next){
	User.findOne({TaskId:task._id})
	    let taskidArr = user.TaskId
	    .then(user => {$pull: {taskidArr: task._id}},
		user.save(function(err, result_user){
		  if(!err) next()
		  else res.status(500).json(err.message)
		}))
	    .catch(error => res.status(500).json(err.message))
})

taskSchema.pre('remove', function(next) {
    console.log(`masuk middleware pre remove ===================================`)
    this.model('User').remove({ TaskId: this._id }, next);
});*/

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
