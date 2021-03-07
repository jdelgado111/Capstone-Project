const dotenv = require("dotenv");
dotenv.config();

const fetch = require("node-fetch");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require("express");

const app = express();
app.use(express.static("dist"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Spin up the server
const port = 8080;
app.listen(port, function () {
    console.log("App running on localhost: " + port);
});

//Geonames API
const geoKey = process.env.GEO_KEY;

app.get("/geo/:city", async (req, res) => {
    const city = req.params.city;
    console.log(city);

    const geoUrl = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoKey}`;
    console.log(geoUrl);

    const geoData = await fetch(geoUrl)
    .then(geoRes => geoRes.json());
    //console.log(geoData);
    res.send(geoData);
});

//Weatherbit API
const weatherKey = process.env.WEA_KEY;

app.get("/weather/:date/:lat/:lng", async (req, res) => {
    const date = req.params.date;
    const lat = req.params.lat;
    const lng = req.params.lng;
    console.log(date, lat, lng);

    let weatherUrl;

    if (date === "near") {
        weatherUrl = `http://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lng}&key=${weatherKey}`;
    }
    else {
        weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&key=${weatherKey}`;
    }
    console.log(weatherUrl);

    const weatherData = await fetch(weatherUrl)
    .then(weatherRes => weatherRes.json());
    //console.log(weatherData);
    res.send(weatherData);
});

//Pixabay API
const pixKey = process.env.PIX_KEY;

app.get("/pix/:country", async (req, res) => {
    const country = req.params.country;
    console.log(country);

    const pixUrl = `https://pixabay.com/api/?key=${pixKey}&q=${country}&image_type=photo&category=places&safesearch=true`;
    console.log(pixUrl);

    const pixData = await fetch(pixUrl)
    .then(pixRes => pixRes.json());
    //console.log(pixData);
    res.send(pixData);
})

app.get("/test", (req, res) => {
    res.send("Test");
});
