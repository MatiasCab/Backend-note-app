
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

module.exports = {
    getPlaces
}