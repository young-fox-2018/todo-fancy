const Todo = require('../models/todo');
const {verifyToken} = require('../helpers/index')

module.exports = {
    create: function(req,res,next){
        let {id} = verifyToken(req.body.token)
        console.log(id)
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            user: id
        }, function(err,todos){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json({
                    msg : "Task Created"
                })
            }
        })
    },
    findAll: function(req, res, next){
        Todo.find({}, function(err, todos){
            if(err){
                res.status(400).json(err)
            }else{
                console.log("Found the following records");
                console.log(todos)
                res.status(200).json(todos)
            }
        })
    },
    findOne:function(req, res, next){
        let {id} = verifyToken(req.query.token);
        Todo.findOne({_id : req.params.id}, function(err, todo){
            if(err){
                res.status(400).json(err)
            }else{
                console.log("Found todo ====");
                console.log(todo)
                res.status(200).json(todo)
            }
        })
    },
    update : function(req, res, next){
        let {id} = verifyToken(req.body.token)
        let {title, description, due_date, status} = req.body
        let input = {title, description, due_date, status}
        console.log(input)
        for(let key in input) {
            if(key == undefined)
            delete input[key]
        }
        console.log(id)
        console.log(input,"============")
        Todo.findOneAndUpdate({user: id}, {$set: input}, function(err, result){
            console.log("Updated the task");
            res.status(200).json({
                data: result
            })
        })
    },

    delete : function(req, res, next){
        console.log(req.body.title)
        let {id} = verifyToken(req.body.token)
        Todo.findOneAndDelete({title: req.body.title}, function(err, result){
            if(err){
                res.status(400).json({error : err})
            }else{
                console.log(result)
                console.log("removed the task");
                res.status(200).json("removed task")
            }
        })  
    }
}