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

class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

app.get('/weather', (request, response) => {
    let query = request.query.search;
    let latlon = request.query.lat;
    let cityData = {}
    weatherData.forEach((element) => {
        console.log(latlon == `lat=${element.lat},lon=${element.lon}`)
        // console.log(`lat=${element.lat},lon=${element.lon}`)
        // if( latlon == `lat=${element.lat},lon=${element.lon}` ){
        //     console.log('true')
        //     cityData = element
        // } 
    })
    // console.log(cityData)
    // let name = cityData.city_name
    // let lat = cityData.lat
    // let lon = cityData.lon
    const dayData = (num) => {
        let idxNum = num - 1;
        let date = cityData.data[idxNum].valid_date;
        let desc = cityData.data[idxNum].weather.description;
        return new Forecast(date, desc);
    }
    let one = dayData(1);
    let two = dayData(2);
    let three = dayData(3);
    let forecastArray = []
    forecastArray.push(one, two, three)
    response.status(200).send(forecastArray)
})

// Catch all
app.get('*', (request, response) => {
    response.status(404).send('This route does not exist')
})

// Error handling
app.use((error, request, response, next) => {
    response.status(500).send(error.message);
})

