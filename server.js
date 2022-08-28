'use strict';

// Require:
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const getWeather = require('./modules/weather.js')
const getMovies = require('./modules/movies.js')

// Express Instance:
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.listen(PORT, () => console.log(`It's Alive!! Listening on port: ${PORT}`));

// Endpoints
app.get('/', (request, response) => { response.status(200).send('Home route')})

app.get('/weather', getWeather);

app.get('/movies', getMovies);

// Catch all
app.get('*', (request, response) => {
    response.status(404).send('This route does not exist')
})

// Error handling
app.use((error, request, response, next) => {
    response.status(500).send(error.message);
})

