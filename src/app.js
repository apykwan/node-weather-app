const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env || 3000;

// console.log(__dirname);
console.log(path.join(__dirname, '../public/'));
// console.log(__filename);

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public/');
/* Setup static directory to serve */
app.use(express.static(publicDirectoryPath));

/* Use npm hbs package */
// Define paths for Express Config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
/* Change default directory from 'views' to 'templates' */
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andy'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andy'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help Page',
        name: 'Andy',
        message: 'Help Me, Help You'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a city!'
        })
    };
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: 'check your input!'
            });
        };
        forecast(latitude, longitude, (err, { descriptions, temperature, precip }) => {
            if (err) {
                return res.send({
                    error: 'Unable to find location. Try another search'
                });
            }
            res.send([{
                forecast: descriptions,
                temperature,
                "chance of raining": `${precip}%`,
                location,
            }])
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
});

/* 404 page */
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Articles Not Found',
        name: 'Andy',
        message: 'Help Articles Not Found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Andy',
        message: 'Page not found!'
    });
});

app.listen(port, () => {
    console.log('server is up on port.')
});