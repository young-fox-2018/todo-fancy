var request = require('request');
const Todo = require("../models/Todo.js")
const User = require('../models/Users.js')
const jwt = require('jsonwebtoken');

class taskController{
  static createTodo(req,res){
      const {title,description,dueDate} = req.body
      const newTodo = {title,description,dueDate,status:false}
      // console.log(req.userData.email)
      Todo.create(newTodo)
      .then( todo => {
        return User.findOneAndUpdate(
            { email: req.userData.email}, 
            { $push : { todoList : todo._id } } 
        )
      })
      .then( user => {
        // console.log(user)
        res.status(200).json({user})
      })
      .catch( err=> {
        // console.log(err)
        res.status(400).json({err})
      })    
    }

    static search(req,res){
      return User.find(
        { email: req.userData.email})
      .populate("todoList")
      .then( task => {
        // console.log(task.todoList)
        res.status(200).json({task})
      })
      .catch( err=> {
        // console.log(err)
        res.status(400).json({err})
      })    
    }

    static edit(req,res){
        let {title,description,dueDate} = req.body
        let newData = {title,description,dueDate}
        Todo.findByIdAndUpdate({_id:req.body.id},{newData})
        .then(function(task){
          res.status(200).json({
              message : `update ${task.name} success`
          })
        })
        .catch(function(err){
            res.status(500).json({
                err
            })
        })
    }

    static deleteTodo(req,res){
      Todo.findByIdAndRemove(
        { _id : req.body.id},
      )
      .then(function(task){
          return User.update({ _id : req.userData.id},
            {$pull: { todoList: req.body.id}})
      })   
      .then((user)=>{
        res.status(200).json({
          message : `delete task success`
        })
      })
      .catch(function(err){
          res.status(400).json({
              err
          })
      })
    }
}

module.exports = taskController