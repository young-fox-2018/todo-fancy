const User = require('../models/User')
const Project = require('../models/Project')

class Middleware{
    static isInvited(req,res,next){
        User.findOne({
            _id: req.decoded.id
        })
            .then(user=>{
                let checkInvitation = user.projectInvitations.findIndex(project => project === req.params.id)
                if(checkInvitation !== -1){
                    next()
                } else {
                    res.status(403).json({errors: {project: {message: 'project invitation needed'}}})
                }
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static isMember(req,res,next){
        Project.findOne({
            _id: req.params.id
        })
            .then(project=>{
                let checkMember = project.members.findIndex(member=> member === req.decoded.id)
                if(checkMember == -1){
                    res.status(403).json({errors: {project: {message: 'user is not project\'s member'}}})
                } else {
                    next()
                }
            })
            .catch(err=>{
                res.status(400).json({errors: err.errors || err.message})
            })
    }
}

module.exports = {
    isInvited: Middleware.isInvited,
    isMember: Middleware.isMember
}