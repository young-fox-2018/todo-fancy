"use strict"

const jwt = require('jsonwebtoken')

module.exports = {
    generateToken: (user) => {
        return jwt.sign({user: user}, process.env.SECRET);
    },

    validateToken: (token, cb) => {
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                cb(err)
            } else {
                cb(null, decoded.user)
            }  
        });      
    }
}