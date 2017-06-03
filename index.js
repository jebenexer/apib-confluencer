#!/usr/bin/env node

const osHomedir = require('os-homedir');

var config = require(osHomedir() + '/.apib_confluencer'),
    localConfig = require(process.cwd() + '/apib_confluencer');

if (!config.confluence.password) {
    var read = require('read'), password
    read({ prompt: 'Confluence password: ', silent: true }, function(er, input) {
        config.confluence.password = input
        run();
    })
} else {
    run()
}

function run() {
    Object.keys(localConfig).forEach(function(file) {
        render(file, function(error, stdout, stderr) {
            update(config.confluence, localConfig[file].space, localConfig[file].pageId, stdout)
        })
    })
}

function render(file, success) {
    var exec = require('child_process').exec;
    var cmd = 'api2con ' + file;
    exec(cmd, success);
}

function update(config, space, pageId, content) {
    var Confluence = require("confluence-api");
    var confluence = new Confluence(config);
    confluence.getContentById(pageId, function(err, data) {
        // do something interesting with data; for instance,
        // data.results[0].body.storage.value contains the stored markup for the first
        // page found in space 'space-name' matching page title 'page-title'
        // console.log(data);
        confluence.putContent(space, pageId, data.version.number + 1, data.title, content, function(err, res) {
            if(!err) {
                console.log('Page updated')
            } else {
                console.log('Error: ' + err);
                console.log('Response: ' + JSON.stringify(res));
            }
        })
    })
}
