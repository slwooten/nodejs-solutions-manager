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
        })
        .catch((error) => {
            console.log(error);
        })
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

