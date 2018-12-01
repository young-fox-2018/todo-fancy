const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/todo-fancy', { useNewUrlParser: true });

module.exports = mongoose.connection