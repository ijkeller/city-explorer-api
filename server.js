'use strict';

// Require:
const express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');

// Express Instance:
const app = express();
const PORT = process.env.REACT_APP_PORT || 5050;
app.use(cors());
app.listen(PORT, () => console.log(`It's Alive!! Listening on port: ${PORT}`));

// Endpoints
app.get('/', (request, response) => {
    console.log('Success!!');
    response.status(200).send('Home route')
})








// Catch all
app.get('*', (request, response) => {
    response.status(404).send('This route does not exist')
})

// Error handling
app.use((error, request, response, next) => {
    response.status(500).send(error.message);
})

