const jwt = require('jsonwebtoken')
const Task = require('../models/Task')

const authorization = function(req, res, next) {
    if (!req.headers.token){
        res.status(401).json({
            error: "login first"
        })
    } else {
        let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        Task.findOne({_id:req.params.taskid})
        .then(function(task) {
            if(task.userid === decoded.id)
            next()
        })
        .catch(function(err) {
            console.log(err)
            res.status(401).json({
                error: "access denied"
            })
        })
    }
}

module.exports = authorization