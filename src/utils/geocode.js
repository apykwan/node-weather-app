const axios = require('axios');

const apiKey = 'pk.eyJ1IjoiYXBrd2FuIiwiYSI6ImNrOThieHZjcjBvOTEzbXRhOHg4OXZveHAifQ.4fIMjqmnI28u4fIntCG7kg'

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey}`;
    axios.get(url)
        .then(response => {
            return response;
        })
        .then(({ data }) => {
            const position = data.features[0];
            const latitude = position.geometry.coordinates[1];
            const longitude = position.geometry.coordinates[0];
            const location = position.place_name;

            return callback(undefined, { latitude, longitude, location });
        })
        .catch(err => {
            return callback(err, undefined)
        });
}

module.exports = geocode;