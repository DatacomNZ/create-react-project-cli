"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path_1 = __importDefault(require("path"));
function copyFileSync(source, target) {
    var targetFile = target;
    //if target is a directory a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path_1.default.join(target, path_1.default.basename(source));
        }
    }
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}
function copyFolderRecursiveSync(source, target) {
    var files = [];
    //check if folder needs to be created or integrated
    var targetFolder = path_1.default.join(target, path_1.default.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }
    //copy
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = path_1.default.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            }
            else {
                copyFileSync(curSource, targetFolder);
            }
        });
    }
}
function copyContentFolder() {
    var target = path_1.default.resolve(process.cwd());
    copyFolderRecursiveSync(path_1.default.resolve(__dirname, '../content/src'), target);
    copyFolderRecursiveSync(path_1.default.resolve(__dirname, '../content/.storybook'), target);
}
exports.copyContentFolder = copyContentFolder;
