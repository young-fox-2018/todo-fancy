const Group = require('../models/group')
const Invitation = require('../models/invitation')

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
        res.status(200).json({
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
    if (req.currentUser.id != req.body.receiver) {
      Invitation
        .create({
          group : req.params.groupId,
          receiver: req.body.receiver,
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
}

module.exports = GroupController
