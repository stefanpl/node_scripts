#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var dir = require('node-dir');
var Kraken = require('kraken');



function isImageFile(filename) {
    return filename.match(/(jpe?g|png)$/);
}

function fileSizeInKB(file) {
    var stats = fs.statSync(file)
    var fileSizeInBytes = stats["size"]
    return fileSizeInKilobytes = fileSizeInBytes / 1000.0
}


var api_key = fs.readFileSync(__dirname+'/apikey', {'encoding': 'utf-8'}).replace(/[^a-z0-9]/g, '');
var api_secret = fs.readFileSync(__dirname+'/apisecret', {'encoding': 'utf-8'}).replace(/[^a-z0-9]/g, '');

if (!api_key || !api_secret) {
    throw new Error('no api key/secret found.');
}

var kraken = new Kraken({
    api_key: api_key,
    api_secret: api_secret
});

var opts = {
    file: fs.createReadStream('wow_afri_dose_1.jpg'),
    wait: true,
    lossy: true
};

kraken.upload(opts, function (err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err);
        console.log(err);
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url);
    }
});

var folder = (process.argv[2]) ? process.argv[2] : '.';
var options = [];


dir.files(folder, function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
        if (isImageFile(file)) {

        }
    });
});