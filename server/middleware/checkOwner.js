const User = require('../models/user')

function checkOwner(req, res, next) {
    if (req.currentUser.tasks.indexOf(req.params.id)) {
        next()
    }
}

module.exports = checkOwner