var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
const tasksRouter = require('./routes/task');
const projectRouter = require('./routes/project');
var app = express();

var mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.mName}:${process.env.mSecret}@ds149763.mlab.com:49763/teamtodo`, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`mongoose connected!`)
});

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/projects', projectRouter);

module.exports = app;
