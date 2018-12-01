const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

class TaskController {
  static create (req, res) {
    Task
      .create({
        name : req.body.name,
        description : req.body.description,
        status : req.body.status,
        deadline : req.body.deadline,
        userId : req.currentUser.id
      })
      .then(task => {
        res.status(201).json(task)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static createTaskToGroup (req, res) {
    Task
      .create({
        name : req.body.name,
        description : req.body.description,
        status : req.body.status,
        deadline : req.body.deadline,
        userId : req.currentUser.id,
        groupId : req.params.groupId
      })
      .then(task => {
        res.status(201).json({
          task,
          msg : 'Success add task to group'
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static delete (req, res) {
    Task
      .deleteOne({
        _id : req.params.id
      })
      .then(response => {
        res.status(200).json({
          msg : 'delete success',
          response : response
        })
      })
  }

  static update (req, res) {
    Task
      .findByIdAndUpdate({
        _id : req.params.id
      }, {
        $set : {
          name : req.body.name,
          status : req.body.status,
          description : req.body.description,
          deadline : req.body.deadline
        }
      }, {
        new : true
      })
      .then(response => {
        res.status(200).json({
          msg : 'Task updated',
          response : response
        })
      })
      .catch(err => {
        res.status(500).json({
          err : err.message
        })
      })
  }

  static showAll (req, res) {
    Task
      .find({
        userId : req.currentUser.id
      })
      .then(tasks => {
        res.status(200).json(tasks)
      })
      .catch(err => {
        res.status(500).json({
          err : err.message
        })
      })
  }

  static showAllGroupTask (req, res) {
    Task
      .find({
        groupId : req.params.groupId
      })
      .then(tasks => {
        res.status(200).json(tasks)
      })
      .catch(err => {
        res.status(500).json({
          err : err.message
        })
      })
  }
}

module.exports = TaskController
