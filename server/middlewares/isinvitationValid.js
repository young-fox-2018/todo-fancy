const Invitation = require('../models/invitation')

function isInvitationValid(req, res, next) {
    Invitation
        .findOne({
            _id: req.params.invitationId
        })
        .then(invitation => {
            if(invitation) {
                //check whether the one requesting is the invitee
                if(String(invitation.invitee) == req.currentUserId) {
                    next()
                } else {
                    res.status(400).json({message: "Sorry! But you are not the one being invited"})
                }
            } else {
                res.status(400).json({message: "Invitation does not exist"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message, note:"Please see console for details"})
        })

}

module.exports = isInvitationValid