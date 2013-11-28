#!/usr/bin/env node

var assert = require('assert');

var request = require('request');

request({
  "uri": "http://npm-info.herokuapp.com/express/name,author%2Fname,repository%2Furl",
  "json": true
}, function (err, res, data) {
  if (err) {
    console.error(err.message);
  } else if (res.statusCode !== 200) {
    console.log("Unexpected response:");
    console.log(data);
  } else {
    console.log("%s -- %s", data.name, data.repository.url);
    assert.equal(data.name, "express");
    assert.equal(data.author.name, "TJ Holowaychuk");
    assert.equal(data.repository.url, "git://github.com/visionmedia/express");

    console.log("\nDEBUG:\n%s", JSON.stringify(data, null, 2));
  }
});

