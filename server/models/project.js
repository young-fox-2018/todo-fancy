const 	mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
	title:{type:String, require:true},
	description:{type:String, require:true},
	CreatedId:{type:'ObjectId', ref:'User'},
	InvitedId:[{type:'ObjectId', ref:'User'}],
	MemberId:[{type:'ObjectId', ref:'User'}],
	RejectedId:[{type:'ObjectId', ref:'User'}],
	TaskId:[{type:'ObjectId', ref:'Task'}]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

