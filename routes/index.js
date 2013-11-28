#!/usr/bin/env node

// requires
var mask = require('json-mask');

// exports
exports.index = function (req, res) {
  res.render('index', {title: 'npm-info'});
};

exports.details = function (req, res) {
  req.info = mask(req.info, req.details);
  res.json(req.info);
};

