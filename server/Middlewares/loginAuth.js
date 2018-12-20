const User = require('../models/user')
const {verifyToken} = require('../helpers/index')
const Todo = require('../models/todo')


module.exports = {
    loginAuth : function(req, res, next){
        let {id} = verifyToken(req.headers.token)
        // console.log(id)
        User.findOne({_id : id}, function(err, data){
            if(err){
                res.status(400).json(err)
            }else{
                if(!data){
                    res.status(401).json(err)
                }else{
                    req.userId = id;
                    next()
                }
            }
        })
    }
}