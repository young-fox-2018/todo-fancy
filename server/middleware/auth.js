"use strict"

const jwt = require('../helper/jwt')

module.exports = {
    checkLogin: (req, res, next) => {  
        let token = req.query.token || req.body.token
       
        jwt.validateToken(token, (err, result) => {
            if (err) {
                res.status(501).json( {
                    err: err,
                    msg: "Please try again"
                })
            } else {
                if (!result) {
                    res.status(404).json( {
                        err: err,
                        msg: "Token is not valid"
                    })
                } else {
                    req.result = result
                    console.log(req.result,'4444444')
                    next()
                }
            }
        })
    }
}