const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utilities/generateMarkdown');

// array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Please enter the project name:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please enter a brief description of your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Please enter any installation instructions for your project:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Please provide usage instructions for your project:',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Please choose a license for your project:',
    choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'Unlicense'],
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Please provide contribution guidelines for your project:',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Please provide instructions for running tests on your project:',
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'What is your GitHub username?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
  },
];

// write to the readme file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err ? console.error(err) : console.log('README file generated successfully!')
  );
}

// function that initializes program
function init() {
  inquirer.prompt(questions).then((answers) => {
    const markdown = generateMarkdown(answers);
    writeToFile('README.md', markdown);
  });
}

// call function to initialize
init();