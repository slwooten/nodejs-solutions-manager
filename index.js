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
        const challengeDir = files[1];
        const algorithmDir = files[2];
        if (files.length === 3) {
            // gets cwd - which is now the module the user selected //
            const currentDir = process.cwd();
            // loops through to list out content of Activities, Challenge, and Algorithms //
            for (let i = 0; i < files.length; i++) {
                fs.readdir(`${currentDir}/${files[i]}`, (err, files) => {
                    if (files.length > 5) {
                        enterActivities(files, `${currentDir}/${activityDir}`);
                    } else if (files.includes('Main')) {
                        console.log('looped files: ', files);
                        removeMain(`${currentDir}/${challengeDir}`);
                    } else {
                        enterActivities(files, `${currentDir}/${algorithmDir}`);
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

// const enterAlgorithms = (folders, cwd) => {
//     console.log('algorithm folders: ', folders);
// }

const removeSolution = (cwd) => {
    console.log('is this right?', cwd);
    fs.rmdir(cwd, { recursive: true }, err => {
        if (err) {
            throw err;
        };

        console.log(`${cwd} is deleted!`);
    });
};

const removeMain = (cwd) => {
    console.log('is this right again? ', cwd);
    fs.rmdir(`${cwd}/Main`, { recursive: true }, err => {
        if (err) {
            throw err;
        };

        console.log(`${cwd}/Main is deleted!`);
    });
};

getDirectories();
