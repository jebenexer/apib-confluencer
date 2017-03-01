#!/usr/bin/env node

const os = require('os');

var config = require(os.homedir() + '/.apib_confluencer'),
    localConfig = require('./apib_confluencer');

Object.keys(localConfig).forEach(function(file) {
    render(file, function(error, stdout, stderr) {
        update(config.confluence, localConfig[file].pageId, stdout);
    })
})

function render(file, success) {
    var exec = require('child_process').exec;
    var cmd = 'api2con ' + file;
    exec(cmd, success);
}

function update(config, pageId, content) {
    var Confluence = require("confluence-api");
    console.log('Update ' + pageId);
    console.log('Content ' + content);
    var confluence = new Confluence(config);
    confluence.getContentById(pageId, function(err, data) {
        // do something interesting with data; for instance,
        // data.results[0].body.storage.value contains the stored markup for the first
        // page found in space 'space-name' matching page title 'page-title'
        console.log(data);
        //confluence.putContent("space", pageId, "version++", title, content);
    });
}
