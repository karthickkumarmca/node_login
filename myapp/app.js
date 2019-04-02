var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
const v = require('node-input-validator');
//var db = require('monk')('tonyusr:tony123@182.72.85.20:27017/tonydb')
var mysql      = require('mysql');

var cors = require('cors');
var nodemailer = require('nodemailer');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.locals.connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'djaxtech',
  database : 'signup'
});
app.locals.email = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'karthikkumar144@gmail.com',
    pass: 'kumar!!*karthi'
  }
});

app.locals.connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.locals.connection = connection.connect();
console.log('started');

app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', usersRouter);

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
  res.render('error');
});

module.exports = app;
