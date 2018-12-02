const mongoose = require('mongoose')

const Schema = mongoose.Schema
const invitationSchema = new Schema({
    invitee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    status: {
        type: String,
        default: "Pending",
        required: true
    }
})

const Invitation = mongoose.model('Invitation', invitationSchema, 'Invitations')

module.exports = Invitation