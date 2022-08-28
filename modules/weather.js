'use strict';

const axios = require('axios');

class Forecast {
    constructor(obj) {
        this.date = obj.valid_date;
        this.icon = `https://www.weatherbit.io/static/img/icons/${obj.weather.icon}.png`
        this.description = obj.weather.description;
        this.high_temp = obj.high_temp;
        this.low_temp = obj.low_temp;
        this.precip = `${
            Math.round(obj.precip)
        }%`
    }
}

async function getWeather(request, response) {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?units=I&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

    try {
        let weatherResponse = await axios.get(weatherUrl);
        let weatherArray = weatherResponse.data.data.map((element) => new Forecast(element))
        response.status(200).send(weatherArray)
    } catch (err) {
        console.log(`Error message: ${err}`)
        response.status(500).send('server error')
    }
}

module.exports = getWeather;