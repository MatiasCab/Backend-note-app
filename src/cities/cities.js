
const { ObjectId } = require('mongodb');
const { getDb } = require('../server/db/conn');

const PLACES_COLLECTION_NAME = 'places';

async function getPlaces(res){
    getDb()
    .collection(PLACES_COLLECTION_NAME)
    .find({})
    .toArray(function (err, result) {
        if (err) {
            res.status(400).send("Error fetching places!");
        } else {
            res.json(result);
        }
    });
}

async function getPlace(res, name){
    console.log(name);
    getDb()
    .collection(PLACES_COLLECTION_NAME)
    .findOne({city: String(name)}, function (err, result) {
        if (err) {
            res.status(400).send("Error fetching place!");
        } else {
            res.json(result);
        }
    })
}

module.exports = {
    getPlaces,
    getPlace
}