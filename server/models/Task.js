"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  name: String,
  details: String,
  due_date: Date,
  status: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task