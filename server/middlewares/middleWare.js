const User = require('../models/User')
const {verifyToken} = require('../helpers/helper')

module.exports = {
    authLogin: (req, res, next) => {
        if (!req.headers.auth) {
            res.status(400).json({
                message: "Permission denied for access todo"
            })
        } else {
            let token = req.headers.auth
            let data = verifyToken(token)

            User.findOne({
                email: data.email
            })
            .then((result_user) => {
                if(result_user) {
                        req._dataUser = data
                        next()
                    } else {
                        res.status(400).json({
                            message: 'Invalid Token'
                        })
                    }
                }).catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                });
        }
    }
}