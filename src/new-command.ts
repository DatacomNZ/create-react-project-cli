#!/usr/bin/env node

var pckg = require('./../package.json');
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var path = require('path');
var commander = require('commander');
var reactApp = require('./react-app');

commander
    .version(pckg.version)
    .arguments('<projectName>')
    .description("Create React client app with Datacom cli")
    .action(function (projectName: string, c: any) {
        reactApp.createApp(projectName);
    })
    .parse(process.argv);