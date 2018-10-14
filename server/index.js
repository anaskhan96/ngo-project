'use strict';

// listing all imports
let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let requireDir = require('require-dir');
let routes = requireDir('./routes');
let auth = require('./middleware/auth');
let mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://localhost:27017/ngodb', {
	useNewUrlParser: true
}).then(
	() => console.log('mongoose connected to db'),
	err => console.log(err)
);

// express setup
let app = express();
app.set('port', 8080);
app.use(express.static(__dirname + '/public')); // css and js
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
		if (!req.cookies.ngotok) return next();
		auth.direct(res, next, req.cookies.ngotok);
	},
	(req, res) => {
		console.log('GET /');
		res.render('index.ejs');
	});


for (let route in routes)
	app.use('/' + route, routes[route]);

app.get('/logout', (req, res) => {
	res.clearCookie('ngotok');
	res.redirect('/');
});

app.use((req, res, next) => {
	console.log('Undefined route: ' + req.method + ' ' + req.originalUrl);
	res.status(404).render('404.ejs');
});

module.exports = app;