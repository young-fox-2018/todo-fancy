const Group = require('../models/group')
const Invitation = require('../models/invitation')
const User = require('../models/user')

class GroupController {
  static create(req, res) {
    Group
      .create({
        name : req.body.name,
        owner : req.currentUser.id
      })
      .then(group => {
        return Group
          .update({
            _id : group._id
          }, {
            $push : {
              members : req.currentUser.id
            }
          })
      })
      .then(result => {
        res.status(201).json({
          msg : 'Success creating Group'
        })
      })
      .catch(err => {
        res.status(500).json({
          err : err.message
        })
      })
  }

  static invite(req, res) {
    User
      .findOne({
        email : req.body.email
      })
      .then(user => {
        if (user) {
          Group
            .findById(req.params.groupId)
            .then(group => {
              if (group.members.indexOf(user._id) != -1) {
                res.status(400).json('user already joined this group')
              } else {
                if (req.currentUser.id != req.body.receiver) {
                  Invitation
                    .create({
                      group : req.params.groupId,
                      receiver: user._id,
                      sender: req.currentUser.id,
                      status: 'pending'
                    })
                    .then(invitation => {
                      res.status(201).json({
                        msg : 'invitation sent',
                        data : invitation
                      })
                    })
                    .catch(err => {
                      res.status(500).json({
                        err: err.message
                      })
                    })
                } else {
                    res.status(400).json({
                      msg : 'you already join this group'
                    })
                }
              }
            })
            .catch(err => {
              res.status(500).json({
                err: err.message
              })
            })
        } else {
          res.status(400).json('User does not exist')
        }
      })
      .catch(err => {
        res.status(500).json('Failed to invite user')
      })
  }
}

module.exports = GroupController
