//const dotenv = require("dotenv");
//dotenv.config();

const fetch = require("node-fetch");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

/*

///GET route///
function getData(req, res) {
    res.send(projectData);
}

app.get('/getData', getData);


///POST Route///
function addData(req, res) {
    const newData = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    };

    projectData = newData;
    res.send(projectData);
    console.log(projectData);
}

app.post('/addData', addData);
*/
