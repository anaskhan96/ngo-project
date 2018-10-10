'use strict';

// listing all imports
let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let requireDir = require('require-dir');
let routes = requireDir('./routes');
let auth = require('./middleware/auth');

// express setup
let app = express();
app.set('port', 8080);
app.use(express.static(__dirname + '/views')); // css and js
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
		if (!req.cookies.ngotok) return next();
		auth.direct(res, next, req.cookies.ngotok);
	},
	function(req, res) {
		console.log('GET /');
		res.render('index.ejs');
	});


for (let route in routes)
	app.use('/' + route, routes[route]);

app.get('/logout', function(req, res) {
	res.clearCookie('ngotok');
	res.redirect('/');
});

module.exports = app;