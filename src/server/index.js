var path = require('path')

const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(express.static('dist'))

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

