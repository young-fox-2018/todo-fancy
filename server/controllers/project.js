const Project = require('../models/project')
const Invitation = require('../models/invitation')
const Todo = require('../models/todo')

class Controller {
    static createProject(req, res) {
        Project
            .create({
                creator: req.currentUserId,
                name: req.body.name
            })
            .then(project => {
                res.status(201).json({ message: "Project Created", data: project })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: "Please see console for details" })
            })
    }
    static viewProjects(req, res) {
        let projectArray =[]
        Project
            .find({
                creator: req.currentUserId
            })
            .then(projects => {
                if (projects.length > 0) {
                    projectArray = projects
                }
                //check in members id
                return Project
                        .find()
                        .then(allProject => {
                            allProject.forEach(element => {
                                element.members.forEach(datum => {
                                    if(String(datum) == req.currentUserId) {
                                        projectArray.push(element)
                                    }
                                });
                            });
                            res.status(200).json({message: "Data Retrieved", data: projectArray})
                        })

            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: "Please see console for details" })
            })
    }
    static invite(req, res) {
        Invitation
            .create({
                invitee: req.body.inviteeId,
                project: req.body.projectId
            })
            .then(invitation => {
                res.status(201).json({ message: "Invitation Created", data: invitation })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: "Error", note: "Please see console for details" })
            })
    }
    static viewInvitations(req, res) {
        Invitation
            .find({
                invitee: req.currentUserId,
                status: "Pending"
            })
            .populate('project')
            .populate({
                path: 'project',
                populate: {
                    path: 'creator'
                }
            })
            .then(invitations => {
                res.status(200).json({ message: "Data retrieved", data: invitations })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: "Error", note: "Please see console for details" })
            })
    }
    static accept(req, res) {
        //change status in invitation to Accept
        Invitation
            .findOneAndUpdate(
                {
                    _id: req.params.invitationId
                },
                {
                    status: 'Accept'
                }
            )
            .then(response => {
                // push the invitee ID to members list
                return Project
                        .findOne({
                            _id: response.project
                        })
                        .then(project => {
                            let newArray = project.members.slice()
                            newArray.push(response.invitee)
                            project.members = newArray
                            return project.save()
                        })
                        .then(() => {
                            res.status(200).json({message: 'Invitation accepted'})
                        })

            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: "Error", note: "Please see console for details" })
            })
    }
    static viewProjectTodo(req, res) {
        Todo
            .find({
                project: req.params.projectId
            })
            .then(projectTodo => {
                res.status(200).json({message: "Data retrieved", data: projectTodo})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: "Error", note: "Please see console for details" })
            })
    }
}

module.exports = Controller