'use strict';

const express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json');
const cors = require('cors');

const PORT = process.env.REACT_APP_PORT || 5050;
console.log(`It's Alive!! on port: ${process.env.REACT_APP_PORT}`)

const app = express();

app.use(cors());

app.get('/', (request, response) => {
    console.log('Success!!');
    response.status(200).send('Welcome!!!')
})









app.get('*', (request, response) => {
    response.status(404).send('This route does not exist')
})

app.use((error, request, response, next) => {
    response.status(500).send(error.message);
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
