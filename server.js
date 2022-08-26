'use strict';

// Require:
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

// Express Instance:
const app = express();
const PORT = process.env.REACT_APP_PORT || 5050;
app.use(cors());
app.listen(PORT, () => console.log(`It's Alive!! Listening on port: ${PORT}`));

class Forecast {
    constructor(obj) {
        this.date = obj.valid_date;
        this.description = obj.weather.description
        this.temp = obj.temp
    }
}

// Endpoints
app.get('/', (request, response) => {
    console.log('Success!!');
    response.status(200).send('Home route')
})

app.get('/weather', getWeather);

async function getWeather(request, response) {
    let search = request.query.search;
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityData = {}
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHER_API_KEY}`;

    try {
        let weatherResponse = await axios.get(weatherUrl);
        let weatherArray = weatherResponse.data.data.map((element) => new Forecast(element))
        console.log(weatherArray)
        response.status(200).send(weatherArray)
    } catch (err) {
        console.log(`Error message: ${err}`)
        response.status(500).send('server error')
    }
}

app.get('/movies', async (request, response) => {

})

// Catch all
app.get('*', (request, response) => {
    response.status(404).send('This route does not exist')
})

// Error handling
app.use((error, request, response, next) => {
    response.status(500).send(error.message);
})

