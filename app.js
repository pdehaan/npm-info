#!/usr/bin/env node

// requires
var http = require('http');
var path = require('path');

var express = require('express');
var routes = require('./routes/index');

var npmInfo = require("./lib/npminfo");

// application
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// params
app.param("name", function (req, res, next, name) {
  npmInfo.getInfo(name).then(function (info) {
    req.info = info;
    next();
  }, function (err) {
    next(err);
  });
});
app.param("details", function (req, res, next, details) {
  req.details = details;
  next();
});

// middlewares
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
  app.locals.pretty = true;
}

// routes
app.get('/', routes.index);
app.get('/:name/:details?', routes.details);

// start server
app.listen(app.get('port'), function () {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

