#!/usr/bin/env node
"use strict";
var pckg = require('./../package.json');
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var path = require('path');
var commander = require('commander');
var reactApp = require('./react-app');
commander
    .version(pckg.version)
    .command("update")
    .description("Create React client app with Datacom cli")
    .action(function () { })
    .parse(process.argv);
reactApp.updateApp();
