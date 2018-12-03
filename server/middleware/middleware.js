const User = require('../models/user')

module.exports = {
    findOne: (req, res, next) => {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user) next()
                else {
                    return User.create({
                        email: req.body.email
                    })
                }
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    }
}