const User = require('../models/user')

function inviteeExist(req, res, next) {
    User
        .findOne({
            _id: req.body.inviteeId
        })
        .then(user => {
            if(user) {
                req.invitee = user
                next()
            } else {
                res.status(400).json({message: "Invitee does not exist"})
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message, note:"please see console for details"})
        })
}
module.exports = inviteeExist