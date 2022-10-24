

const PLACES = [
    {lat: "-34.8941",long: "-56.0675", city: "Montevideo"},
    {lat: "-34.6118",long: "-58.4173", city: "Buenos Aires"},
];

async function getPlaces(){
    return PLACES;
}

module.exports = {
    getPlaces
}