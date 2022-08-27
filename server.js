'use strict';

// Require:
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

// Express Instance:
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.listen(PORT, () => console.log(`It's Alive!! Listening on port: ${PORT}`));

class Forecast {
    constructor(obj) {
        this.date = obj.valid_date;
        this.icon = `https://www.weatherbit.io/static/img/icons/${obj.weather.icon}.png`
        this.description = obj.weather.description;
        this.high_temp = obj.high_temp;
        this.low_temp = obj.low_temp;
        this.precip = `${obj.precip * 100}%`
    }
}

class MovieElement {
    constructor(obj) {
        this.id = obj.id
        this.title = obj.title;
        this.release_date = obj.release_date;
        this.poster = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
        this.backdrop = `https://image.tmdb.org/t/p/w500${obj.backdrop_path}`;
    }
}

// Endpoints
app.get('/', (request, response) => {
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
        response.status(200).send(weatherArray)
    } catch (err) {
        console.log(`Error message: ${err}`)
        response.status(500).send('server error')
    }
}

app.get('/movies', async (request, response) => {
    let mdbKey = process.env.REACT_APP_MOVIEDB_API_KEY;
    let query = request.query.search;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${mdbKey}&page=1&query=${query}&include_adult=false`

    try {
        let movieResponse = await axios.get(movieUrl);
        let movieArray = movieResponse.data.results.map((element) => new MovieElement(element) )
        response.status(200).send(movieArray)


    } catch (err) {
        console.log(`Error message: ${err}`)
        response.status(500).send('server error')
    }
})

// Catch all
app.get('*', (request, response) => {
    response.status(404).send('This route does not exist')
})

// Error handling
app.use((error, request, response, next) => {
    response.status(500).send(error.message);
})

