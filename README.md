# Solutions Manager

Command line application built for TA's working with edX Coding Bootcamps. Allows user to select Module they would like to remove solution folders from. Once selected, all solved folders in Activities and Algorithms are deleted along with the Main folder in the Challenge directory and mini project.


## Setting up the tool:

- Clone the repo
- Copy the removeSolutions.js, package.json, and package-lock.json files and paste them into your class repo
- Run ``` npm install ``` in the root directory of your class repo
- If you have a .gitignore already in the root directory, add:      
``` 
/removeSolutions.js      
/package.json      
/package-lock.json 
```
- if not, create a gitignore in the root of the class repo and add   
```
/node_modules 
/removeSolutions.js      
/package.json      
/package-lock.json 
```

## How to Use it:

- After you've set up the tool, in the root directory of the class repo run:      
```
npm run remove
```

- Select the Module that needs to have it's solutions removed
- That's it, you should receive an output in the terminal of each directory that was deleted
