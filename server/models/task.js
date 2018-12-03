const mongoose = require("mongoose")
const Schema = mongoose.Schema

const taskSchema = new Schema({
    UserId: { type: Schema.Types.ObjectId, ref: "User" },
    name: String,
    description: String,
    status: { type: Boolean, default: false },
    priority: { type: Boolean, default: false },
    dueDate: { type: Date }
})
const Tasks = mongoose.model("Tasks", taskSchema)
module.exports = Tasks