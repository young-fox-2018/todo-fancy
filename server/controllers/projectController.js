const 	Project = require('../models/project.js'),
				User = require('../models/user.js'),
				mailer = require('../helpers/mailer.js');
require('dotenv').config()

class ProjectController{

  static create(req, res){
    let project = new Project({
      title: req.body.title,
      description: req.body.description,
      CreatedId: req.decode.id
    })
    project.save((err, project_result)=> {
      if (err) res.status(500).json({error:err.message})
      else res.status(201).json(project_result)
    })
  }

  static readProject(req, res){
    Project.findOne({_id:req.params.id})
        .populate('TaskId')
        .then(result => {
           res.status(200).json(result.TaskId)
        })
        .catch(error => {
           console.log(error)
           res.status(500).json({error:"Something wrong, please call developer!"})
        })
  }
  
  static list(req, res){
    Project.find({ $or:[{CreatedId: req.decode.id},{MemberId: req.decode.id}]})
	   .populate('InvitedId')
	   .populate('MemberId')
	   .then(projects=> {
	     let projectsArr=[]
	     let MemberIdArr=[]
	     let InvitedIdArr=[]
	     for(let i=0; i<projects.length; i++){	   
	       let projectObj={}
	       projectObj._id= projects[i]._id,
	       projectObj.title= projects[i].title,
	       projectObj.description= projects[i].description
	       for(let j=0; j<projects[i].MemberId.length; j++){
		  		MemberIdArr.push(projects[i].MemberId[j].email)
	       }
	       projectObj.MemberId= MemberIdArr
	       for(let j=0; j<projects[i].InvitedId.length; j++){
	          InvitedIdArr.push(projects[i].InvitedId[j].email)
	       }
	       projectObj.InvitedId= InvitedIdArr
	       projectsArr.push(projectObj)
	       MemberIdArr=[]
	       InvitedIdArr=[]
	     }
	        
	     res.status(200).json(projectsArr)
	   })
	   .catch(error=> {
	     res.status(500).json({error:error.message})
	   })
  }
  
  static inviteMember(req, res){
    User.findOne({$or:[{username:req.body.identity},{email:req.body.identity}]})
				.then(user=> {
					if (user){
						Project.findById(req.body.projectId)
										.then(project => {
											let resultInvited = project.InvitedId.indexOf(user._id);
											let resultMember = project.MemberId.indexOf(user._id);
												if (resultInvited === -1 && resultMember === -1){
													project.update({$push: {InvitedId: user._id}, $pull: {RejectedId: user._id}})
																	.then(result=> {
																			user.update({$push: {InvitationId: req.body.projectId}})
																					.then(result=>  {
																						let subject = `You have invited to join todoteam project!`
																						let resultText = `You receive this email cause ${req.decode.email} invite you to join ${project.title} todoteam project at teamtodo.grouppoint.online. Please check your invitation in teamtodo.grouppoint.online`
																						mailer ( user.email, subject, resultText, (err ) => {
																								if ( err) {
																										console.log(err)
																										res.status(500).json({'found error':err})
																								}
																								else res.status(200).json('To complete the sign up process, you need to check your emails and click a link' )
																						})
																						res.status(200).json("Invitation send success..!")
																					})
																					.catch(error=> res.status(500).json({error: error.message}))
																	})
																	.catch(error=> {
																			res.status(500).json({error: error.message})
																	})
												}else{
													res.status(500).json({error: "user already invited or being this project member"})
												}
										})
					}else{
						res.status(500).json({error:"user not found!"})
					}
				})
				.catch(error=> {
					res.status(500).json(error)
				})
  }

  static accept(req, res){
	 User.findById(req.decode.id)
		 .then(user=> {
		    user.update({$pull: {InvitationId: req.body.projectId}, $push: {ProjectId: req.body.projectId}})
		         .then(()=> {
			         Project.findById(req.body.projectId)
											.then(project=> {
											project.update({$pull: {InvitedId: req.decode.id}, $push: {MemberId: req.decode.id}})
															.then(result=> {res.status(200).json("Acception process success")})
														.catch(error=> {res.status(500).json({error: error.message})})
								})
								.catch(error=> {res.status(500).json({error: error.message})})
				 })
				 .catch(error=> {res.status(500).json({error: error.message})})
		 })
		 .catch(error=> {res.status(500).json({error: error.message})})
  }

  static reject(req, res){
  	 User.findById(req.decode.id)
		 .then(user=> {
		    user.update({$pull: {InvitationId: req.body.projectId}})
		         .then(()=> {
			         Project.findById(req.body.projectId)
	                           .then(project=> {
 		                            project.update({$pull: {InvitedId: req.decode.id}, $push: {RejectedId: req.decode.id}})
			                                  .then(result=> {res.status(200).json("Acception process success")})
				                              .catch(error=> {res.status(500).json({error: error.message})})
								})
								.catch(error=> {res.status(500).json({error: error.message})})
				 })
				 .catch(error=> {res.status(500).json({error: error.message})})
		 })
		 .catch(error=> {res.status(500).json({error: error.message})})
}

  static createToDoProject(){}

  static read(){}

  static update(){}

  static delete(){}
}

module.exports= ProjectController;

