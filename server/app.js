var createError = require('http-errors');
var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const taskRouter = require('./routes/tasks')

var app = express();
const cors = require('cors')

//require mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo');

//test connction mongoose
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
// we're connected!
console.log("Database todo connect")
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
require('dotenv').config()
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', taskRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
  // next(createError(404));
// });
// 
// error handler
// app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // console.log(err)
// 
  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
// });

module.exports = app;
