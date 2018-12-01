const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')
const Group = require('../models/group')
const Invitation = require('../models/invitation')
const {OAuth2Client} = require('google-auth-library')
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID)

class Auth {
  static isLogin(req, res, next) {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    User
      .findOne({
        email : decoded.email
      })
      .then(user => {
        req.currentUser = {
          username : user.username,
          email : user.email,
          id : user._id
        }
        next()
      })
      .catch(err => {
        res.status(500).json({
          err : err.message
        })
      })
  }

  static isOwner(req, res, next) {
    Task
      .findById(req.params.id)
      .then(task => {
        if(task.userId.equals(req.currentUser.id)){
          next()
        } else {
          res.status(400).json({
            msg : "Unauthorized Access"
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          err : err.message
        })
      })
  }

  static isGroupOwner(req, res, next) {
    Group
      .findById(req.params.groupId)
      .then(group => {
        if(group.owner.equals(req.currentUser.id)){
          next()
        } else {
          res.status(401).json('Access Unauthorized')
        }
      })
      .catch(err => {
        res.status(500).json({
          err : err.message
        })
      })
  }

  static isInvitationOwner(req, res, next) {
    Invitation
      .findById(req.params.id)
      .then(invitation => {
        if(invitation) {
          if(invitation.receiver.equals(req.currentUser.id)) {
            next()
          } else {
            res.status(401).json({
              err : 'Access Unauthorized'
            })
          }
        } else {
          res.status(400).json({
            msg : 'Invitation not found'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          err : err.message
        })
      })
  }

  static isMember(req, res, next) {
    Group
      .findById(req.params.groupId)
      .then(group => {
        if(group.members.indexOf(req.currentUser.id) != -1) {
          next()
        } else {
          res.status(401).json({
            msg : 'Access Unauthorized'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          err : err.message
        })
      })
  }

  static googleValidation(req, res, next) {
    client.verifyIdToken({
        idToken: req.body.gToken,
        audience: CLIENT_ID
    }, function(err, result) {
        if(err){
          console.log(err)
            res.send(500).json(err)
        } else {
            const payload = result.getPayload();
            let user = {
                email: payload.email,
                username: payload.name
            }
            req.decoded = user
            next()
        }
    })
  }
}

module.exports = Auth
