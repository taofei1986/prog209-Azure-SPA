var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//added below
var favicon = require('serve-favicon');
var bodyParser = require('body-parser'); 
// Add for Database
// New code that knows mongo and a nice abstraction layer
var mongo = require('mongodb'); 
var monk = require('monk'); 
// add a connection string to mlab.com
// not using local db:  var db = monk('localhost:27017/nodetest2');
// use our connection string copied from the cloud mongo.
var db = monk('mongodb://bc_taofei:bctaofei1226@ds014648.mlab.com:14648/prog219-chen');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router 
app.use(function(req,res,next){ 
  req.db = db;
  next();
}); 

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
