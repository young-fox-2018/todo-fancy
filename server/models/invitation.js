const mongoose = require('mongoose')

var invitationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    invitorId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Group'
    },
    status: Boolean
})

const invitation = mongoose.model('Invitation', invitationSchema)

module.exports = invitation