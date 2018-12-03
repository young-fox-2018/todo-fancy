var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const todosRouter = require('./routes/todo')
// const fbLogin = require('./routes/fbLogin')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


// Database connection
mongoose.connect('mongodb://localhost/dbTodos')
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log(`Database is connected!`);
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// app.use('/', indexRouter)
app.use('/users', usersRouter);
app.use('/todos', todosRouter)
// app.use('/facebook', fbLogin)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
