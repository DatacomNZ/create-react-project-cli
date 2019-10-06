import chalk from 'chalk';
import execa from 'execa';
import Listr from 'listr';
import inquirer from 'inquirer';


const questions = [
    {
        type: 'list',
        name: 'storageType',
        message: 'Select State manager',
        choices: [{name: 'none', value: 0 }, { name: 'Redux', value: 1}, { name: 'Mobx', value: 2 }],
        default: 0
    },
    {
        type: 'list',
        name: 'webComponents',
        message: 'Select Web Component Library',
        choices: [{name: 'none', value: 0 }, { name: 'react-bootstrap', value: 1}, { name: 'react material ui', value: 2 }, { name: 'react blueprint', value: 3 }],
        default: 0
    }
];

function getCreateTasks(projectName: string, options: any): Listr {
    return new Listr([
        {
            title: 'Executing create-react-app',
            task: (ctx: any, task: any) =>  execa('npx', ['create-react-app', projectName, '--typescript'])
        },
        {
            title: 'Changing directory',
            task: (ctx: any, task: any)  =>  process.chdir(projectName)
        },
        {
            title: 'Installing customisations',
            task: () => {
                return addCustomisationsTasks(options);
            }
        }
    ], {concurrent: false});
}

function addCustomisationsTasks(options: any) {
    return new Listr([
        {
            title: 'Installing react-router-dom',
            task: (ctx: any, task: any)  =>  execa('npm', ['install', '--save', 'react-router-dom'])
        },
        {
            title: 'Installing redux',
            enabled: () => options.storageType == 1,
            task: (ctx: any, task: any)  =>  execa('npm', ['install', '--save', 'redux @types/redux', 'react-redux', '@types/react-redux'])
        },
        {
            title: 'Installing mobx-react',
            enabled: () => options.storageType == 2,
            task: (ctx: any, task: any)  =>  execa('npm', ['install', '--save', 'mobx-react'])
        },
        {
            title: 'Installing react-bootstrap',
            enabled: () => options.webComponents == 1,
            task: (ctx: any, task: any)  =>  execa('npm', ['install', '--save', 'react-bootstrap', 'bootstrap'])
        },
        {
            title: 'Installing @material-ui/core',
            enabled: () => options.webComponents == 2,
            task: (ctx: any, task: any)  =>  execa('npm', ['install', '--save', '@material-ui/core']).then(() => {
            })
        }, 
        {
            title: 'Installing @blueprintjs/core',
            enabled: () => options.webComponents == 3,
            task: (ctx: any, task: any)  =>  execa('npm', ['install', '--save', '@blueprintjs/core'])
        }
    ]);
}

function createTasksFinished(answers: any) {
    if (answers.webComponents == 2) {
        console.log(chalk.yellow('Todo: add <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" /> to public/index.html'));
    }
}

export async function createApp(projectName: string) {
    console.log(chalk.green("Creating new UI Project: " + projectName));
    const answers = await inquirer.prompt(questions);

    console.log(chalk.green("Grab a coffee, this will take a couple of minutes :-)"));

    getCreateTasks(projectName, answers).run()
        .then(() => { createTasksFinished(answers); })
        .catch((err: string) => {
            console.error(err);
        });
}

export async function updateApp() {
    const answers = await inquirer.prompt(questions);

    console.log(chalk.yellow("Updating current app"));

    console.log(chalk.green("Grab a coffee, this will take a couple of minutes :-)"));

    addCustomisationsTasks(answers).run()
        .then(() => { createTasksFinished(answers); })
        .catch((err: string) => {
            console.error(err);
        });
}