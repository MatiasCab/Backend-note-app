// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { getPlaces } = require('./cities/cities');

const CURRENT_VERSION = 'v1';
const CITIES_RESOURCE = 'cities';
const CITIES_ENDPOINT = `/${CURRENT_VERSION}/${CITIES_RESOURCE}`;

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get(CITIES_ENDPOINT, async (req, res) => {
    res.send(await getPlaces());
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});