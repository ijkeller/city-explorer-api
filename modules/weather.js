'use strict';

let cache = require('./cache.js');
const axios = require('axios');


class Forecast {
    constructor(obj) {
        this.date = obj.valid_date;
        this.icon = `https://www.weatherbit.io/static/img/icons/${obj.weather.icon}.png`
        this.description = obj.weather.description;
        this.high_temp = obj.high_temp;
        this.low_temp = obj.low_temp;
        this.precip = `${ Math.round(obj.precip) }%`
    }
}

async function getWeather(request, response) {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let key = `weather-${lat}&${lon}`
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?units=I&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    
    try {
    if (cache[key] && (Date.now() - cache[key].timestamp < 2.16e+7)) {
        console.log('Cache hit');
        console.log(cache[key].data)
        return cache[key].data;
      } else {
        console.log('Cache miss');
        cache[key] = {};
        cache[key].timestamp = Date.now();
        let weatherResponse = await axios.get(weatherUrl);
        let weatherArray = weatherResponse.data.data.map((element) => new Forecast(element))
        cache[key].data = weatherArray
        response.status(200).send(weatherArray)
      }
    } catch (error) {
        console.log(`Error message: ${error}`)
        response.status(500).send('server error')
    }
    
}

module.exports = getWeather;