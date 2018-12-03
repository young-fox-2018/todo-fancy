var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors')

mongoose.connect('mongodb://localhost/todo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connect to database")
});

var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

module.exports = app;