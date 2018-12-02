var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');

// ROUTER
var taskRouter = require('./routes/taskRoute')
var usersRouter = require('./routes/userRoute')

var app = express();

mongoose.connect('mongodb://localhost/todo-fancy');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// USE

app.use('/task', taskRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('Routes Not Implemented');
});

module.exports = app;
