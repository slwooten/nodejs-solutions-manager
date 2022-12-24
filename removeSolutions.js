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

// CHANGE WORKING DIRECTORY //
const changeDirectory = (chosenDirectory) => {
    const newDirectory = `./${chosenDirectory}`;

    process.chdir(newDirectory);

    fs.readdir(process.cwd(), (err, files) => {
        const activityDir = files[0];
        const challengeDir = files[1];
        const algorithmDir = files[2];
        if (files.length === 3) {
            const currentDir = process.cwd();
            for (let i = 0; i < files.length; i++) {
                fs.readdir(`${currentDir}/${files[i]}`, (err, files) => {
                    if (files.length > 5) {
                        enterActivities(files, `${currentDir}/${activityDir}`);
                    } else if (files.includes('Main')) {
                        removeMain(`${currentDir}/${challengeDir}`);
                    } else {
                        enterActivities(files, `${currentDir}/${algorithmDir}`);
                    }
                });
            }
        }
    });
};

// ENTER ACTIVITIES FOLDERS, CHECK IF EACH INCLUDES SOLVED FOLDER, IF SO, DELETE //
const enterActivities = (folders, cwd) => {
    console.log('folders', folders);
    for (let i = 0; i < folders.length; i++) {
        fs.readdir(`${cwd}/${folders[i]}`, (err, files) => {
            if (files === undefined) {
                return;
            } else {
                if (files.includes('Solved')) {
                    removeSolution(`${cwd}/${folders[i]}/Solved`);
                };
            }
        });
    };
};

// USES fs.rmdir TO REMOVE THE SOLUTION DIRECTORY //
const removeSolution = (cwd) => {
    // console.log('is this right?', cwd);
    fs.rm(cwd, { recursive: true }, err => {
        if (err) {
            throw err;
        };

        console.log(`${cwd} is deleted!`);
    });
};

// USES fs.rmdir TO REMOVE THE MAIN DIRECTORY //
const removeMain = (cwd) => {
    console.log('is this right again? ', cwd);
    fs.rm(`${cwd}/Main`, { recursive: true }, err => {
        if (err) {
            throw err;
        };

        console.log(`${cwd}/Main is deleted!`);
    });
};

getDirectories();
