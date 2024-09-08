# Weather Dashboard
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT)
## Description
This project allows a user to enter a city name and see a dashboard of the current weather and a five day forecast starting from the current day. The top/current weather is the most recent, published date of the weather and the forecast is weather at 12pm for each day. Weather data is gathered using the Open Weather API.<br>

Technologies used:<br>
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.JS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)

## Installation

- The user must clone the repo locally with this command:
```bash
git clone https://github.com/PhilipMcF/Weather-Dashboard.git
```

- Node.JS will be needed as well as the package manager to acquire the necessary modules:<br>
https://nodejs.org/en/download/package-manager

- Npm modules are needed in order to function properly so they will need to be installed. Run this command in the directory where the repo is installed:
```bash
npm install && npm run install
```

## Usage

To start the project locally, make sure you are in the directory of the repo/project and run this command in a terminal window:
```bash
npm run client:build && cd server && npm run build
```
After that command has run completely, run this final command:
```bash
npm run start:dev
```

This will open a new browser window with the project running locally. Type in a city into the field on the left and press enter or click the submit button. The current weather will then be shown as well as a 5 day forecast.

[View the deployed application on Render here!](https://weather-dashboard-keu0.onrender.com)

## Contributing
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)<br>
To contribute to this project, you can fork it or create an issue and provide any suggestions or solutions.
Please try and follow the Contributor Covenant code of conduct and leave a star if you like the project.

## Questions
For any and all questions, please contact me here:
- GitHub: https://github.com/PhilipMcF
- Email: philipsm1998@gmail.com

## License
[This project is licensed under the MIT license.](#https://opensource.org/license/mit)