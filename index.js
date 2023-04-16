const fs = require('fs');
const inquirer = require('inquirer');
// const generateMarkdown = require('./generateMarkdown');

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

// function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err ? console.error(err) : console.log('README file generated successfully!')
  );
}

// function to initialize program
function init() {
  inquirer.prompt(questions).then((answers) => {
    const markdown = generateMarkdown(answers);
    writeToFile('README.md', markdown);
  });
}

// function call to initialize program
init();

// ***************************
function generateMarkdown(data) {
  return `
# ${data.title}

${renderLicenseBadge(data.license)}

## Description

${data.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${data.installation}

## Usage

${data.usage}

${renderLicenseSection(data.license)}

## Contributing

${data.contributing}

## Tests

${data.tests}

## Questions

If you have any questions, please contact the project owner by clicking on the email listed below. 

[![GitHub followers](https://img.shields.io/github/followers/${data.githubUsername}?style=social)](https://github.com/${data.githubUsername})
[${data.email}](mailto:${data.email})
`;
}

function renderLicenseBadge(license) {
  const badge = license === 'Unlicense' ? 'unlicense-blue.svg' : `${license}-blue.svg`;
  return `![License](https://img.shields.io/badge/License-${badge})`;
}

function renderLicenseLink(license) {
  return {
    'MIT': '[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)',
    'Apache-2.0': '[https://opensource.org/licenses/Apache-2.0](https://opensource.org/licenses/Apache-2.0)',
    'GPL-3.0': '[https://www.gnu.org/licenses/gpl-3.0.en.html](https://www.gnu.org/licenses/gpl-3.0.en.html)',
    'BSD-3-Clause': '[https://opensource.org/licenses/BSD-3-Clause](https://opensource.org/licenses/BSD-3-Clause)',
    'Unlicense': '[http://unlicense.org/](http://unlicense.org/)',
  }[license] || '';
}

function renderLicenseSection(license) {
  const link = renderLicenseLink(license);
  if (!link) return '';
  return `
## License

This application is covered by the ${license} license. [${link}](${link})
`;
}