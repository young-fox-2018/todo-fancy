const Task = require('../models/Task')

function isOwner(req,res,next){
    Task.findOne({
        _id:req.params.id
    })
        .then(task=>{
            console.log(task.owner, '===', req.decoded.id)
            if(task.owner == req.decoded.id){
                next()
            } else {
                console.log('masuk 403')
                res.status(403).json({errors: {authorization: {message: 'Forbidden'}}})
            }
        })
        .catch(err=>{
            res.status(400).json({errors: err.errors || err.message})
        })
}

module.exports = isOwner