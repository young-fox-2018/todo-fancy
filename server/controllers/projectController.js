const 	Project = require('../models/project.js'),
	User = require('../models/user.js');

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
	  console.log(`masuk read project`)
	  console.log(req.params)
    Project.findOne({_id:req.params.id})
        .populate('TaskId')
        .then(result => {
           console.log(result)
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
		   console.log(`masuk list project`)
		   console.log(projects)
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
	     
	     console.log(`hasil modif list project`)
	     console.log(projectsArr)	   
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
				   console.log(req.body.projectId)
			     user.update({$push: {InvitationId: req.body.projectId}})
				   .then(result=> res.status(200).json("Invitation send success..!")
				   .catch(error=> res.status(500).json({error: error.message}))
			   )})
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

