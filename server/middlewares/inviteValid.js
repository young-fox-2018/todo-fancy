const Project = require('../models/project')
const Invitation = require('../models/invitation')


function inviteValid(req, res, next) {
    Project
        .findOne({
            _id: req.body.projectId
        })
        .then(project => {
            if (project) {
                // check if user inviting is the creator
                if (String(project.creator) == req.currentUserId) {
                    if (String(project.creator) == req.body.inviteeId) {
                        res.status(400).json({ message: "You can't invite yourself" })
                    } else {
                        //check if user has been invited before
                        Invitation
                            .findOne({
                                invitee: req.body.inviteeId,
                                project: req.body.projectId
                            })
                            .then(response => {
                                if (!response) {
                                    next()
                                } else {
                                    if (response.status === "Pending") {
                                        res.status(400).json({ message: "Person has already been invited before, please be patient for their response" })
                                    } else if (response.status === "Reject") {
                                        res.status(400).json({ message: "Person has rejected the invitation" })
                                    } else if (response.status === "Accept") {
                                        res.status(400).json({ message: "Person has already accepted the invitation" })
                                    }
                                }
                            })
                    }
                } else {
                    res.status(400).json({ message: "Invalid Creator" })
                }
            } else {
                res.status(400).json({ message: "Project does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err.message, note: "please see console for details" })
        })
}

module.exports = inviteValid