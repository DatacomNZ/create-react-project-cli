"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var execa_1 = __importDefault(require("execa"));
var listr_1 = __importDefault(require("listr"));
var inquirer_1 = __importDefault(require("inquirer"));
var questions = [
    {
        type: 'list',
        name: 'storageType',
        message: 'Select State manager',
        choices: [{ name: 'none', value: 0 }, { name: 'Redux', value: 1 }, { name: 'Mobx', value: 2 }],
        default: 0
    },
    {
        type: 'list',
        name: 'webComponents',
        message: 'Select Web Component Library',
        choices: [{ name: 'none', value: 0 }, { name: 'react-bootstrap', value: 1 }, { name: 'react material ui', value: 2 }, { name: 'react blueprint', value: 3 }],
        default: 0
    }
];
function getCreateTasks(projectName, options) {
    return new listr_1.default([
        {
            title: 'Executing create-react-app',
            task: function (ctx, task) { return execa_1.default('npx', ['create-react-app', projectName, '--typescript']); }
        },
        {
            title: 'Changing directory',
            task: function (ctx, task) { return process.chdir(projectName); }
        },
        {
            title: 'Installing customisations',
            task: function () {
                return addCustomisationsTasks(options);
            }
        }
    ], { concurrent: false });
}
function addCustomisationsTasks(options) {
    return new listr_1.default([
        {
            title: 'Installing react-router-dom',
            task: function (ctx, task) { return execa_1.default('npm', ['install', '--save', 'react-router-dom']); }
        },
        {
            title: 'Installing redux',
            enabled: function () { return options.storageType == 1; },
            task: function (ctx, task) { return execa_1.default('npm', ['install', '--save', 'redux @types/redux', 'react-redux', '@types/react-redux']); }
        },
        {
            title: 'Installing mobx-react',
            enabled: function () { return options.storageType == 2; },
            task: function (ctx, task) { return execa_1.default('npm', ['install', '--save', 'mobx-react']); }
        },
        {
            title: 'Installing react-bootstrap',
            enabled: function () { return options.webComponents == 1; },
            task: function (ctx, task) { return execa_1.default('npm', ['install', '--save', 'react-bootstrap', 'bootstrap']); }
        },
        {
            title: 'Installing @material-ui/core',
            enabled: function () { return options.webComponents == 2; },
            task: function (ctx, task) { return execa_1.default('npm', ['install', '--save', '@material-ui/core']).then(function () {
            }); }
        },
        {
            title: 'Installing @blueprintjs/core',
            enabled: function () { return options.webComponents == 3; },
            task: function (ctx, task) { return execa_1.default('npm', ['install', '--save', '@blueprintjs/core']); }
        }
    ]);
}
function createTasksFinished(answers) {
    if (answers.webComponents == 2) {
        console.log(chalk_1.default.yellow('Todo: add <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" /> to public/index.html'));
    }
}
function createApp(projectName) {
    return __awaiter(this, void 0, void 0, function () {
        var answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(chalk_1.default.green("Creating new UI Project: " + projectName));
                    return [4 /*yield*/, inquirer_1.default.prompt(questions)];
                case 1:
                    answers = _a.sent();
                    console.log(chalk_1.default.green("Grab a coffee, this will take a couple of minutes :-)"));
                    getCreateTasks(projectName, answers).run()
                        .then(function () { createTasksFinished(answers); })
                        .catch(function (err) {
                        console.error(err);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.createApp = createApp;
function updateApp() {
    return __awaiter(this, void 0, void 0, function () {
        var answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt(questions)];
                case 1:
                    answers = _a.sent();
                    console.log(chalk_1.default.yellow("Updating current app"));
                    console.log(chalk_1.default.green("Grab a coffee, this will take a couple of minutes :-)"));
                    addCustomisationsTasks(answers).run()
                        .then(function () { createTasksFinished(answers); })
                        .catch(function (err) {
                        console.error(err);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateApp = updateApp;
