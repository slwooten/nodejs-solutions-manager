const process = require('process');
const fs = require('fs');
const inquirer = require('inquirer');

// Gets all folders from current working directory
const getDirectories = () => {
	const dPath = process.cwd();

	fs.readdir(dPath, (err, files) => {
		pickDirectory(files);
	});

};

// Prompt user to select module they'd like to use
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

// Change into the appropriate directory
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
					if (files.length > 8) {
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

// Enter Activities folder, remove Solved folder if present
const enterActivities = (folders, cwd) => {
	for (let i = 0; i < folders.length; i++) {
		fs.readdir(`${cwd}/${folders[i]}`, (err, files) => {
			if (files === undefined) {
				return;
			} else {
				if (files.includes('Solved')) {
					removeSolution(`${cwd}/${folders[i]}/Solved`);
				} else if (files.includes('Main')) {
					removeSolution(`${cwd}/${folders[i]}/Main`);
				}
			}
		});
	};
};

// Remove the Solutions/Main Folder
const removeSolution = (cwd) => {
	fs.rm(cwd, { recursive: true }, err => {
		if (err) {
			throw err;
		};

		console.log(`${cwd} is deleted!`);
	});
};

// Remove Main folder in Challenge directory
const removeMain = (cwd) => {
	fs.rm(`${cwd}/Main`, { recursive: true }, err => {
		if (err) {
			throw err;
		};

		console.log(`${cwd}/Main is deleted!`);
	});
};

getDirectories();
