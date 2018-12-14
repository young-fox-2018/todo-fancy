const 	jwt = require('jsonwebtoken'),
	User = require('../models/user.js'),
	Task = require('../models/task.js')
	Project = require('../models/project.js');
require('dotenv').config();

class Middleware{
  static authentication(req, res, next){
    let token = req.headers.jtoken
    jwt.verify(token,process.env.jSecret,(err, result)=>{
      if(err){
        console.log(err)
				res.status(500).json({error:"Something wrong, please contact developer!"})
      } else {
				req.decode = result
				User.findById(req.decode.id)
						.then(result => {
							console.log(`======================================`)
							console.log(result)
							if (result){
								next()
							} else {
								res.status(500).json({error:"Something wrong, please contact developer!"})
							}
									})
							.catch(error => {
								console.log(error)
								res.status(500).json({error:"Something wrong, please contact developer!"})
							})
      };
    });
  }

  static authorization(req, res, next){
		User.findOne({_id:req.decode.id})
		.then(user => {
		  let isUserTask = user.TaskId.filter(task => task._id == req.params.id)
		  if (isUserTask.length !== 0 ){
			next()
		  } else {
			res.status(500).json({error:"Something wrong, please contact developer!"})
		  }
		})
		.catch(error => {
					console.log(error)
					res.status(500).json({error:"Something wrong, please contact developer!"})
		})
  }
	  
	static authorizationProjectMember(req, res, next){
		  Project.findOne({_id:req.headers.projectid})
		  .then(project => {
		  let isUserCreatedProject = project.CreatedId == req.decode.id
		  let isUserMemberProject = project.MemberId.filter(project => project._id == req.decode.id)
		  if (isUserCreatedProject || isUserMemberProject.length !== 0 ){
			next()
		  } else {
			res.status(500).json({error:"Something wrong, please contact developer!"})
		  }
	  })
	}
/*    static authorization(req, res, next){
	  console.log(req.body)
	  console.log(req.params)
    Project.findOne({_id:req.params.projeciId})
	.then(project => {
	  let isUserCreatedProject = project.CreatedId.filter(project => project._id == req.params.id)
	  let isUserMemberProject = project.MemberId.filter(project => project._id == req.params.projeciId)
	  if (isUserCreatedProject.length !== 0 || isUserMemberProject.length !== 0 ){
	    next()
	  } else {
	    res.status(500).json({error:"Something wrong, please contact developer!"})
	  }
	})
	.catch(error => {
                console.log(error)
                res.status(500).json({error:"Something wrong, please contact developer!"})
        })
  }
  
      static authorizationProjectMember(req, res, next){
	  console.log(req.body)
	  console.log(req.params)
    Project.findOne({_id:req.params.projeciId})
	.then(project => {
	  let isUserMemberProject = project.MemberId.filter(project => project._id == req.params.projeciId)
	  if (isUserTask.length !== 0 ){
	    next()
	  } else {
	    res.status(500).json({error:"Something wrong, please contact developer!"})
	  }
	})
	.catch(error => {
                console.log(error)
                res.status(500).json({error:"Something wrong, please contact developer!"})
        })
  }*/
};

module.exports = Middleware;
