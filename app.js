var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
var cloudinary = require('cloudinary').v2
require('dotenv').config();
var database = require('./database');

var photosRouter = require('./routes/photos');

// Always use HTTPS
var secure = require('express-force-https');
var app = express();
app.use(secure);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/tokensignin', function(req, res) {
	console.log("token sign in!");
});

app.use('/', photosRouter);

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

// cloudinary stuff
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//console.log("test: " + process.env.CLIENT_ID);

//cloudinary.url("sample.jpg", {width: 100, height: 150, crop: "fill"})

// Uploads with tag "test"
// We can do tag = album name
//cloudinary.uploader.upload("/home/steven/Downloads/server/public/images/git.png", {tags: "test"}, function(error, result) { console.log(result) });
//console.log(cloudinary.resources_by_tag("test"));

// This retrieves the image
//cloudinary.api.resources_by_tag("test", function(error, result){console.log(result);});

module.exports = app;
