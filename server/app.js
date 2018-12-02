var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors')
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
const mongoose = require('mongoose');
var app = express();
require('dotenv').config()

mongoose.connect('mongodb://localhost/my_database');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(501).json( {
    error: "route not implemented"
  })
});

module.exports = app;
