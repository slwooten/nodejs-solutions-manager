const process = require('process');
const fs = require('fs');
const inquirer = require('inquirer');

// GETS ALL FOLDER FROM CURRENT WORKING DIRECTORY //
const getDirectories = () => {
    const dPath = process.cwd();

    fs.readdir(dPath, (err, files) => {
        pickDirectory(files);
    });

};

// USES INQUIRER TO PROMPT USER - USER SELECTS MODULE THEY'D LIKE TO USE //
const pickDirectory = (files) => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'chosenDirectory',
                message: 'Please select the Module that needs to have solutions removed.',
                choices: files,
            }
        ])
        .then((answers) => {
            console.log('Chosen Directory: ', answers.chosenDirectory);
            changeDirectory(answers.chosenDirectory);
        })
        .catch((error) => {
            console.log(error);
        })
};

// function to change working directory and log out the files in it
const changeDirectory = (chosenDirectory) => {
    const newDirectory = `./${chosenDirectory}`;

    process.chdir(newDirectory);
    console.log('Navigated to: ', process.cwd());

    fs.readdir(process.cwd(), (err, files) => {
        // pickDirectory(files);
        console.log(files);
        const activityDir = files[0];
        if (files.length === 3) {
            // gets cwd - which is now the module the user selected //
            const currentDir = process.cwd();
            // loops through to list out content of Activities, Challenge, and Algorithms //
            for (let i = 0; i < files.length; i++) {
                fs.readdir(`${currentDir}/${files[i]}`, (err, files) => {
                    if (files.length > 5) {
                        // functionality for going into each activity folder and deleting solved //
                        enterActivities(files, `${currentDir}/${activityDir}`);
                    } else {
                        console.log('looped files: ', files);
                    }
                });
            }
        }
    });
};

const enterActivities = (folders, cwd) => {
    console.log('activity folders: ', folders);
    console.log('passed down cwd: ', cwd);
    for (let i = 0; i < folders.length; i++) {
        console.log('what were reading', `${cwd}/${folders[i]}`);
        fs.readdir(`${cwd}/${folders[i]}`, (err, files) => {
            console.log('individual activity files: ', files);
            if (files.includes('Solved')) {
                removeSolution(`${cwd}/${folders[i]}/Solved`);
            };
        });
    };
};

const removeSolution = (cwd) => {
    console.log('is this right?', cwd);
}

getDirectories();

// changeDirectory();

// get list of folders (modules)

// ask which module you need to remove solutions from

// cd into that module

// cd into activities folder
    // cd into each activity, delete solved folder, cd up and to next activity

// cd into challenge folder 
    // delete Main folder if it's there

// cd into algorithms
    // cd into each algoritm, delete solved folder, cd up and to next algorithm


