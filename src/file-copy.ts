var fs = require('fs');
import path from 'path';

function copyFileSync(source: any, target: any) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source: any, target: any) {
    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source));
    if ( !fs.existsSync(targetFolder) ) {
        fs.mkdirSync(targetFolder);
    }

    //copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function (file: any) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync(curSource, targetFolder);
            }
        } );
    }
}

export function copyContentFolder() {
    var target = path.resolve(process.cwd());
    
    copyFolderRecursiveSync(path.resolve(__dirname, '../content/src'), target);
    copyFolderRecursiveSync(path.resolve(__dirname, '../content/.storybook'), target);
}