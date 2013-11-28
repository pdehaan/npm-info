#!/usr/bin/env node

var Promise = require("promise");
var mask = require("json-mask");
var Client = require('npm-pkginfo');

var client = new Client({
    cacheStore: new Client.stores.memory()
});

function getInfo(client, name) {
    return new Promise(function (resolve, reject) {
        client.get(name, function (err, info) {
            if (err) {
                return reject(err);
            }
            resolve(info);
        });
    });
}

function filterPkg(info) {
    var data = mask(info, "name,description,author,repository,dist-tags");
    // remap some data
    // data.author = data.author.name;
    // data.repository = data.repository.url;
    // data.version = info["dist-tags"].latest;
    // if (data.repository.match("github.com")) {
    //     data.repository = data.repository.replace(/\.git$/i, "");
    // }
    return data;
}


exports.getInfo = function (name) {
    return getInfo(client, name).then(filterPkg);
};

