// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { getPlaces } = require('./cities/cities');

const CURRENT_VERSION = 'v1';
const CITIES_ENDPOINT = `/${CURRENT_VERSION}/places`;
const NOTES_ENDPOINT = `/${CURRENT_VERSION}/notes`;

const notes = [{ id: '1', color:'dark', title: 'Spiderman', placeId:"1", body:'texto de la note', temperature:'20', date:'2020/12/10'},
{ id: '2', color:'dark', title: 'Titulo 2', placeId:"2", body:'texto de la note2', temperature:'30', date:'2020/11/10'}
];

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

router.get(NOTES_ENDPOINT, function(req, res, next) {
  res.send(notes);
});

router.post(NOTES_ENDPOINT, async (req, res) =>{
  const newPost = req.body;
  notes.push(newPost);
  res.status(200).send('Note added');
})

router.put(NOTES_ENDPOINT + '/:id', async (req, res) => {
  const updatedNote = req.body;
})

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});