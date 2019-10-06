#!/usr/bin/env node
"use strict";
var pckg = require('./../package.json');
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var path = require('path');
var commander = require('commander');
var reactApp = require('./react-app');
var program = new commander.Command();


clear();
console.log(chalk.yellow(figlet.textSync('Datacom UI cli', { horizontalLayout: 'full' })));

commander
    .version(pckg.version)
    .command("new", "create a new react project with recommended practices", { isDefault: true, executableFile: "new-command" })
    .command("update", "updates a current react project with recommended practices", { executableFile: "update-command" })
    .description("Create React client app with Datacom cli")
    .parse(process.argv);