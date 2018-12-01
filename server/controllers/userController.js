const User = require('../models/user.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Invitation = require('../models/invitation')
const Group = require('../models/group')
const Helpers = require('../helpers/helpers.js')

class UserController {

  static create(req, res) {
    User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json({
          err: err.message
        })
      })
  }

  static login(req, res) {
    User
      .findOne({
        email : req.body.email
      })
      .then(user => {
        const result = Helpers.checkPassword(req.body.password, user.password)
        if (result) {
          const token = Helpers.generateToken({ email : user.email})
          res.status(200).json({
            token : token,
            msg : 'Login success'
          })
        } else {
          res.status(400).json({
            msg : 'Invalid username or password'
          })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
    //res.status(200).json(req.body)
  }

  static showInvitation(req, res) {
    Invitation
      .find({
        receiver : req.currentUser.id
      })
      .then(invitation => {
        res.status(200).json(invitation)
      })
      .catch(err => {
        res.status(500).json({
          msg : err.message
        })
      })
  }

  static changeInvitationStatus(req, res) {
    Invitation
      .findByIdAndUpdate({
        _id : req.params.id
      }, {
        $set : {
          status : req.body.status
        }
      }, {
        new : true
      })
      .then(invitation => {
        res.status(200).json(invitation)
      })
      .catch(err => {
        res.status(500).json({
          msg : err.message
        })
      })
  }

  static showGroup(req, res) {
    Group
      .find({
        members : req.currentUser.id
      })
      .then(group => {
        res.status(200).json(group)
      })
      .catch(err => {
        res.status(500).json({
          msg : err.message
        })
      })
  }


}

module.exports = UserController
