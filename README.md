# Capstone Project

## Description
Capstone project for Udacity's Front End Web Developer Nanodegree program.

## Requirements
This project runs on a local server and requires Node to run. If you don't have Node already installed on your machine, you can download it [here](https://nodejs.org/en/download/).

## Installation
If Node is installed, simply run `npm install` on the command line to install all of the required packages listed in `package.json`.

This project requires the use of valid API keys for [Geonames](http://www.geonames.org/export/web-services.html), [Weatherbit](https://www.weatherbit.io/api), and [Pixabay](https://pixabay.com/api/docs/).

Include all three keys in a .env file at the root of your project clone, formatted as follows:
```
GEO_KEY=YOUR GEONAMES API KEY
WEA_KEY=YOUR WEATHERBIT API KEY
PIX_KEY=YOUR PIXABAY API KEY
```

## Instructions and Usage
To run in production mode, type `npm run prod` followed by `npm start` then navigate to localhost:8080 in your browser.

Once the webpage has loaded, enter the name of a city and select the start date and end date of the trip. Press the submit button to view the results.

This project also includes unit testing using Jest framework. To run the tests, type `npm run test`

## Bugs
To run in developer mode, type `npm run dev` then navigate to localhost:8080 in your browser. The page loads, but currently is unable to perform the required GET requests to function properly.
This may be an issue that occurs due to the use of the Webpack Dev Server.
