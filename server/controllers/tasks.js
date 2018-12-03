const Task = require("../models/Task")
const ObjectID = require('mongodb').ObjectID
const bcrypt = require("../helpers/bcrypt")
const User = require("../models/User")

module.exports ={
    create: function(req,res,next){
        Task.create({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            user: ObjectID(req.body.user)
        }, function(err, response){
            if(err) res.status(400).json({err: err.message})
            else{
                res.status(200).json({msg: `you successfully submit task with id ${response.id}`})
            }
        })
    },
    all: function(req,res,next){
        Task.find({})
        .populate("user")
        .exec( function(err,tasks_data){
            if(err) res.status(400).json({err: err.message})
            else{
                res.status(200).json({data: tasks_data})
            }
        })
    },
    delete: function(req,res,next){
        Task.findByIdAndDelete({
            _id: req.params.id
        },
        function(err, deletedTask){
            if(err) res.status(400).json({err: err.message})
            else{
                if(!deletedTask){
                    res.status(400).json({err: `the task is already deleted`})
                } else{
                    console.log(deletedTask)
                    User.findByIdAndUpdate(deletedTask.user,{
                        $pull:{"taskList": deletedTask._id}
                    },function(err){
                        if(err) res.status(400).json({err: err.message})
                        else{
                            res.status(200).json({msg: `you sucessfully deleted a task`})
                        }
                    })
                }
            }
        })
    },
    update: function(req,res,next){
        let updatedData = {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            status: req.body.status
        }
        console.log(updatedData)
        for(let key in updatedData){
            if(updatedData[key] == undefined || updatedData[key] == ""){
                console.log("masuk delete")
                delete updatedData[key]
            }
        }
        console.log(updatedData)
        Task.findByIdAndUpdate(req.params.id,{
            $set: updatedData}, function(err){
                if(err) res.status(400).json({err: err.message})
                else{
                    console.log("harusnya udah jalan")
                    res.status(200).json({msg: `You sucessfully updated the task`})
                }
            }
        )
    }
}