const process = require('process');
const fs = require('fs');
const inquirer = require('inquirer');

// console.log(`Working in ${process.cwd()}`);

const getDirectories = () => {
    const dPath = process.cwd();

    fs.readdir(dPath, (err, files) => {
        pickDirectory(files);
    });

};

const pickDirectory = (files) => {
    // console.log(files);
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
        if (files.length === 3) {
            // go into acitivites folder
            process.chdir(`${files[0]}`);
            console.log('nested to: ', process.cwd());
        } 
    });
};

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


