let path = require('path');
let express = require('express');
let hbs = require('hbs');
let movie = require('./utils/movies');
let app = express();

// website
// will contain the following routes:
// app.com - home
// app.com/help - help page
// app.com/about - about page

// app takes two arguments
// 1. route
// 2. function for when the route is accessed
	// a. req - request - information about the incoming request to the server
	// b. res - response - information about the the outgoing response from the server
	
/* app.get('', (req, res) => {
	// tell what happens when the route is accessed.
});
 */

let publicDirectory = path.join(__dirname, '../public');
let viewsDirectory = path.join(__dirname, '../templates/views');
let partialsDirectory = path.join(__dirname, '../templates/partials');

// implement hbs by using app.set()
app.set('view engine', 'hbs');
app.set('views', viewsDirectory); // sets the path of the custom directory (templates/views folder)
hbs.registerPartials(partialsDirectory); // sets the path of the partials for hbs to use


// points to the public directory where index.html currently lives
app.use(express.static(publicDirectory));

// home route - / or '' 
app.get('', (req, res) => {
	res.render('index', 
		{
			title: 'Home Page',
			name: 'Dr. Arrington',
			course: 'CSC 174'
		}
	); // renders the dynamic index template
});

// about route - /about
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Page',
		name: 'Dr. Arrington',
		course: 'CSC 174'
	});
});

// help route - /help
app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		helpText: 'This is some helpful text from the help page',
		name: 'Dr. Arrington',
		course: 'CSC 174'
	});
});

// weather route - /weather
app.get('/weather', (req, res) => {
	//res.send("You have reached the Weather page"); // tell what happens when the weather route is accessed
	
	if(!req.query.searchTerm)
	{
		res.send({
			error: 'You must provide a city!'
		});
	}
	else
	{
		// make a call to weather module
		movie(req.query.searchTerm, (error, movieData) => {
			if(error)
				return res.send({error: error});
			else
			{
				res.send({movie: movieData});
			}
		});
		// res.send({
			// forecast: "47 Degrees and Cloudy",
			// location: req.query.city
		// });
	}
	
});

app.get('/products', (req, res) => {
	if(!req.query.search)
	{
		res.send({
			error: 'You must provide a search term'
		});
	}
	else
	{
		res.send({
			products: []
		});
	}
});

app.get('/help/*', (req, res) => {
	//res.send("Help Article Not Found");
	res.render('4042', {
		error: "Page not found",
		errorType: "404 Help Article Error"
	});
});

app.get('*', (req, res) => {
	//res.send("404 Error Page");
	res.render('4041', {
		error: "Page not found",
		errorType: "404 Error"
	});
});

// use app.listen to start up the server
// takes at least 1 parameter - tells the port number where the application
// will be served. Port 3000 is a common development port for local machines
//app.listen(3000);

// add a function as an argument which can tell what happens when
// the server is loaded
app.listen(process.env.PORT || 3000, () =>{
	console.log('TESTING ONLY - Server is live on port 3000.');
	console.log('TESTING ONLY - Open your web browser and go to the following URL - localhost:3000');
	console.log('TESTING ONLY - To exit, come back to Node.js command prompt and enter Ctrl+C');
});




