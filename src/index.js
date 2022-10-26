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
    '1': { id: '1', color:'dark', title: 'Spiderman', placeId:"1", body:'texto de la note', date:'2020/12/10'},
    '2': { id: '2', color:'dark', title: 'Titulo 2', placeId:"2", body:'texto de la note2', date:'2020/11/10'}
};

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

app.get(NOTES_ENDPOINT, function(req, res, next) {
  res.send(Object.values(notes));
});


app.get(NOTES_ENDPOINT + '/:id', (req, res) => {
  const id = req.params.id;

  for (let note of notes) {
      if (note.id === id) {
          res.json(note);
          return;
      }
  }
  res.status(404).send('Note not found');
});

app.post(NOTES_ENDPOINT, async (req, res) =>{
  const newPost = req.body;
  notes[newPost.id] = newPost;
  res.status(200).send('Note added successfully');
});

app.put(NOTES_ENDPOINT + '/:id', async (req, res) => {
  const updatedNote = req.body;
  notes[req.params.id] = updatedNote;
  res.status(200).send('Note updated successfully')
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});