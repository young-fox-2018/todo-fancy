const User = require('../models/user');
const {encrypt, verifyToken} = require('../helpers')

module.exports = {
    update : function(req, res, next){
        let {email, password, firstName, lastName, phone, gender, birthdate} = req.body
        let input = {email, password, firstName, lastName, phone, gender, birthdate}
        for(let key in input) {
            if(input[key] == undefined) delete input[key]
        }
        User.findOneAndUpdate({_id: req.params.id}, {$set: input}, function(err, result){
            res.status(201).json({
                msg : "updated data",
                data: result
            })
        })
    },
    delete : function(req, res, next){
        User.findOneAndDelete({_id: req.params.id}, function(err, result){
            if(err){
                res.status(400).json({error : err})
            }else{
                res.status(200).json("removed customer")
            }
        })  
    },
    findOne : function(req,res,next){
        const id = req.userId;
        User.findOne({_id : id}).
        populate('todo').
        exec(function(err, user){
            res.status(200).json(user)
        });
    },
}