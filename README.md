# Full-Stack Dashboard with Image Download Feature

This project is a full-stack web application built with Node.js, Express.js, EJS, CSS, and JavaScript. It features a mobile-responsive dashboard that fetches data from a JSON file and allows the user to download an image file upon clicking the "Download" button.

## Live Demo

You can view the live version of the application at: [Live Demo](https://tesla-omashrees-projects.vercel.app)

## Features
- **Mobile-Responsive Dashboard:** The dashboard layout is fully responsive, ensuring a smooth user experience on both desktop and mobile devices.
- **Data Fetching:** The dashboard fetches data from a JSON file and displays it dynamically, without hardcoding any values into the code.
- **Download Feature:** The "Download" button retrieves an api_secret from the JSON file and sends it as a POST request to a specified endpoint (https://testd5-img.azurewebsites.net/api/imgdownload). Upon receiving the Base64 string of an image, it allows the user to download the image file.
- **API Integration:** The application communicates with an external API to retrieve an image as a Base64-encoded string, which is then made available for download.

## Project Setup

## Prerequisites
- **Node.js:** Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/en/download/package-manager/current).
- **Git:** Git is required to clone the repository. Download it from [here](https://git-scm.com/downloads).

## Getting Started
Clone the Repository
Clone the repository to your local machine:
`git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name`
Install Dependencies
Install the required dependencies by running the following command:
`npm install`
Start the Application Locally
To run the application locally, use the following command:
`npm start`
This will start the server on http://localhost:8080. Open this URL in your browser to view the application.

## Structure Overview

- **public/:** Contains static files such as CSS, images, and JavaScript.
- **views/:** Contains EJS template files for rendering dynamic HTML.
- **task-data.json:** A sample JSON file that holds the data to be displayed in the dashboard. This file is read and served dynamically.
- **index.js:** Main Node.js server file that sets up Express, serves the dashboard, and handles API requests.
- **README.md:** This file.

## How It Works
Data Fetching
When the dashboard is loaded, it fetches data from the data.json file using the fs module. The JSON file contains key-value pairs, including the api_secret.

## Displaying Data on the Dashboard
The fetched data is rendered dynamically on the dashboard using EJS templates.

## Download Button
The "Download" button sends a POST request to the following endpoint when clicked: https://testd5-img.azurewebsites.net/api/imgdownload
The request body contains the api_secret retrieved from the JSON file:
`{
  "api": "<api_secret>"
}`

## Image Download
Upon a successful request, the API returns a Base64 string representing the image file. This string is then made available for the user to download as an image.

## Notes
Make sure that the task-data.json file is correctly formatted and accessible. It should contain the api_secret key, among other data that the dashboard will display.

## File Structure

`/project-root
│
├── /public                    # Static files (CSS, JS)
│   ├── /style.css             # Main CSS file for styling
│   └── /script.js             # Main JavaScript file
│
├── /views                     # EJS templates
│   ├── index.ejs              # Dashboard page template
│
├── task-data.json             # Data file (fetched by the dashboard)
├── index.js                   # Main server file (Node.js / Express)
└── README.md                  # Project documentation`

## License
This project is licensed under the MIT License - see the LICENSE file for details.
