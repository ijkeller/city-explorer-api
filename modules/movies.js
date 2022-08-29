'use strict';

let cache = require('./cache.js');
const axios = require('axios');

class MovieElement {
    constructor(obj) {
        this.id = obj.id
        this.title = obj.title;
        this.release_date = obj.release_date;
        this.poster = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
        this.backdrop = `https://image.tmdb.org/t/p/w500${obj.backdrop_path}`;
    }
}

async function getMovies(request, response) {
    let mdbKey = process.env.MOVIEDB_API_KEY;
    let query = request.query.search;
    let key = `movies-${query}`
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${mdbKey}&page=1&query=${query}&include_adult=false`

    try {
        if (cache[key] && (Date.now() - cache[key].timestamp < 2.16e+7)) {
            console.log('Cache hit');
            console.log(cache)
            return cache[key].data;
        } else {
            console.log('Cache miss');
            cache[key] = {};
            cache[key].timestamp = Date.now();
            let movieResponse = await axios.get(movieUrl);
            let movieArray = movieResponse.data.results.map((element) => new MovieElement(element))
            cache[key].data = movieArray
            response.status(200).send(movieArray)
        }
    } catch (err) {
        console.log(`Error message: ${err}`)
        response.status(500).send('server error')
    }
}

module.exports = getMovies;