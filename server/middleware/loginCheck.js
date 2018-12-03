const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
    loginCheck: function(req, res, next) {
        let token = req.headers.token
        let decoded = jwt.verify(token, process.env.jwtSecret)
        User.findOne({email: decoded.email})
            .then(user => {
                if (user) {
                    req.currentUser = user
                    next()
                }
                else {
                    res.status(400).json({msg: 'please login firts'})
                }
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }
}