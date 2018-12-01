const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invitationSchema = new mongoose.Schema({
  group : {
    type : Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  status : {
    type : String,
    enum : ['pending', 'accepted', 'rejected'],
    required: true
  },
  sender : {
    type : Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver : {
    type : Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Invitation = mongoose.model('Invitation', invitationSchema)

module.exports = Invitation
