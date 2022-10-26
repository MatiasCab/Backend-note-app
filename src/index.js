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

const notes = {
    '1': { id: '1', clase:'bg-warning', titulo: 'Spiderman', ciudad:"1", cuerpo:'texto de la note', temperatura: '', date:'26/10/2022 19:23'},
    '2': { id: '2', clase:'bg-success', titulo: 'Titulo 2', ciudad:"2", cuerpo:'texto de la note2', temperatura: '', date:'26/10/2022 20:20'}
};

// defining the Express app
const app = express();

// adding Helmet to enhance your API's securitys
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

app.get(NOTES_ENDPOINT, function(req, res, next) {
  res.send(Object.values(notes));
});


app.get(NOTES_ENDPOINT + '/:id', (req, res) => {
  const id = req.params.id;
  if (notes[id]) {
    res.send(notes[id]);
  } else {
    res.status(404).send( { error: true, message: 'Note not found' } );
  }
});

app.post(NOTES_ENDPOINT, async (req, res) =>{
  const newPost = req.body;
  const newPostId = `${Math.floor(Math.random() * 1000000)}`;
  newPost.id = newPostId;
  notes[newPost.id] = newPost;
  res.status(200).send({ id: newPost.id, success: true, message: 'Note added successfully' });
});

app.put(NOTES_ENDPOINT + '/:id', async (req, res) => {
  const updatedNote = req.body;
  notes[req.params.id] = updatedNote;
  res.status(200).send({ id: req.params.id, success: true, message: 'Note updated successfully' })
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});