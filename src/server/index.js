// Setup empty js object to act as endpoint for all routes
var geoData = {};
var weatherData = {};
var pictureData = {};

var path = require('path')

const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(express.static('dist'))

/* Middleware*/
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cors = require('cors')
app.use(cors())
app.options('*', cors())

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen('8081', function () {
    console.log('Example app listening on port 8081!');
})

// Returns the geoData
app.get('/retrieveGeoData', (req, res) => {
    res.send(geoData);
})

// Returns the weatherData
app.get('/retrieveWeatherData', (req, res) => {
    res.send(weatherData);
})

// Returns the pictureData
app.get('/retrievePictureData', (req, res) => {
    res.send(pictureData);
})

// Post route to add incoming data to geoData
app.post('/postGeoData', (req, res) => {
    geoData = req.body;
})

// Post route to add incoming weather data to weatherData
app.post('/postWeatherData', (req, res) => {
    weatherData = req.body;
})

// Post route to add incoming picture data to pictureData
app.post('/postPictureData', (req, res)=> {
    pictureData = req.body;
})

app.get('/getUserName', (req, res) => {
    res.send({"user_name": process.env.USER_NAME});
})

app.get('/getWeatherKey', (req, res) => {
    res.send({"weather_key": process.env.WEATHER_KEY})
})

app.get('/getPixabayKey', (req, res) => {
    res.send({"pixabay_key": process.env.PIXABAY_KEY})
})