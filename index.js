// ./src/index.js
require('dotenv').config({ path: './config.env' });
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { getPlaces, getPlace } = require('./src/cities/cities');
const { connectToServer, getDb } = require('./src/server/db/conn');
const { ObjectId } = require('mongodb');

const CURRENT_VERSION = 'v1';
const CITIES_ENDPOINT = `/${CURRENT_VERSION}/places`;
const NOTES_ENDPOINT = `/${CURRENT_VERSION}/notes`;
const NOTES_COLLECTION = 'notes';

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
  getPlaces(res);
});

app.get(CITIES_ENDPOINT+"/:name", async (req, res) => {
  getPlace(res, req.params.name);
});

app.get(NOTES_ENDPOINT, function(req, res, next) {
  getDb()
  .collection(NOTES_COLLECTION).find({}).toArray(function(err, result) {
    if (err) {
      res.status(400).send({ error: true, message: `Error inserting note` });
    } else {
      res.status(200).send(result);
    }
  });
  
});


app.get(NOTES_ENDPOINT + '/:id', (req, res) => {
  const id = req.params.id;
  getDb()
  .collection(NOTES_COLLECTION).findOne({_id: ObjectId(id)}, function (err, result) {
    if (err) {
      res.status(400).send({ error: true, message: `Error geting note` });
    } else {
      res.status(200).send(result)
    }
  });

});

app.post(NOTES_ENDPOINT, async (req, res) =>{
  const newPost = req.body;
  const newPostId = `${Math.floor(Math.random() * 1000000)}`;
  newPost._id = newPostId;
  getDb()
  .collection(NOTES_COLLECTION).insertOne(newPost, function (err, _result) {
    if (err) {
      res.status(400).send({ error: true, message: `Error inserting note` });
    } else {
      res.status(200).send({ id: newPost.id, success: true, message: 'Note added successfully' })
    }
  });
});

app.put(NOTES_ENDPOINT + '/:id', async (req, res) => {
  const updatedNote = req.body;
  const noteId = req.params.id;
  
  const updatedDocument = {
    $set: {
      clase: updatedNote.clase,
      titulo: updatedNote.titulo,
      ciudad: updatedNote.ciudad,
      cuerpo: updatedNote.cuerpo,
      fechaFormateada: updatedNote.fechaFormateada

    }
  };
  getDb()
  .collection(NOTES_COLLECTION)
  .updateOne({ _id: noteId }, updatedDocument, function (err, _result){
    if (err) {
      res.status(400).send(`Cant update` + noteId);
    } else {
      res.status(200).send({ id: req.params.id, success: true, message: 'Note updated successfully' })
    }
  });

  
});

app.delete(NOTES_ENDPOINT + '/:id', async (req, res) => {
  const noteId = req.params.id;
  getDb()
  .collection(NOTES_COLLECTION)
  .deleteOne({ _id: noteId }, function (err, _result) {
    if (err) {
      res.status(400).send({ error: true, message: `Error deleting note with id ${noteId}!` });
    } else {
      res.status(200).send({ success: true, message: `Successfully deleted note with id ${noteId}!` })
    }
  });
});

function start() {
  // starting the server
  app.listen(3001, () => {
    console.log('listening on port 3001');
  });
}

connectToServer(start);