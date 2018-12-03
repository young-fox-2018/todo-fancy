const Todo = require('../models/todo');
const {verifyToken} = require('../helpers/index')

module.exports = {
    create: function(req,res,next){
        const id = req.userId;
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
                res.status(200).json(todos)
            }
        })
    },
    findOne:function(req, res, next){
        const userId = req.userId;
        Todo.findOne({_id : req.params.id}, function(err, todo){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(todo)
            }
        })
    },
    update : function(req, res, next){
        let id = req.headers.task_id;
        console.log(id)
        let input = {title, description, due_date, status} = req.body
        for(let key in input) {
            if(key == undefined)
            delete input[key]
        }
        console.log(input)
        Todo.findOneAndUpdate({_id : id}, {$set: input}, function(err, result){
            console.log("Updated the task");
            res.status(200).json({
                data: result
            })
        })
    },

    delete : function(req, res, next){
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