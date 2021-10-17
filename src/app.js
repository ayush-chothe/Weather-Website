const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express');
const path = require('path');
const hbs = require('hbs'); 

const app = express();
const port = process.env.PORT || 3000;

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'BleedingIron'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'BleedingIron'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'BleedingIron'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address not provided'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, address} = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                address,
                data: forecastData,
                location: req.query.address
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'BleedingIron',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'BleedingIron',
        errorMessage: 'Wrong link bruh!'
    });
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});