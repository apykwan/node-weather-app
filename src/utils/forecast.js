const axios = require('axios');

const apiKey = 'd26568a339c5f63e54f4e13633e7de8b';

function forecast (latitude, longitude, callback) {
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}&units=f`;

    axios.get(url)
    .then(data => {
        return data;
    })
    .then(response => {
        const current = response.data.current;
        const descriptions = current.weather_descriptions[0];
        const temperature = current.temperature;
        const precip = current.precip;
        const forecast = `${descriptions}. It is currently ${temperature} degrees out. There is ${precip} chance of rain.`

        return callback(undefined, forecast);
    })
    .catch(error => {
        callback(error, undefined);
    });
};

module.exports = forecast;