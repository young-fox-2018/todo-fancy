const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
    verToken: function(token){
        let data = jwt.verify(token, process.env.SECRET)
        return data
        // User.findById(data.id,function(err, user){
        //     if(err){
        //         throw new Error("Error di Verify Token")
        //     }
        //     else{
        //         if(user){
        //             console.log(data, "testttttt")
        //             return data
        //         }
        //         else{
        //             throw new Error("User not found!")
        //         }
        //     }
        // })
    }
}