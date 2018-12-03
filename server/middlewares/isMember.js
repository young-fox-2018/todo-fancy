const Project = require('../models/project')

function isMember(req, res, next) { 
    Project.findOne({
        members: req.userID,
        _id: req.params.projectID
    })
        .then( projects => {
            if (projects) {
                next()
            }
            else {
                res.status(400).json({
                    message: 'You are not a member. You are not allowed to access this feature'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err,
                message: 'error from middleware isMember'
            })
        })
}

module.exports = isMember