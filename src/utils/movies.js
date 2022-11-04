var request = require('request');

let movies = (searchTerm, callback) => {
	var url = 'https://api.themoviedb.org/3/search/movie?api_key=a26c7754f852ab8be5eab7814aa98e7d&query=' + searchTerm;

	request({url: url, json: true}, (error, response) => {
		if(error)
		{
			// low level errors
			callback("Unable to connect to the TMDB API");
		}
		else if(response.body.error)
		{
			// checks to see if we have an API level error
			callback(`${response.body.error.info}`);
		}
		else
		{
			// callback
			callback(undefined, {
				//movieID: response.body.results.id, 
				movieTitle: response.results.title
				/**moviePosterPath: response.body.results.backdrop_path, 
				movieReleaseDate:  response.body.results.release_date,
				movieRatings: response.body.results.vote_average, 
				movieOverview: response.body.results.overview, */

			});
		}
	});
};

module.exports = movies;