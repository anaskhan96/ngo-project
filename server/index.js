'use strict';

// listing all imports
let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let loginRouter = require('./routes/login');
let studentHomeRouter = require('./routes/studentHome');
let aboutRouter = require('./routes/about');
let auth = require('./middleware/auth');

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

app.get('/', function(req, res, next) {
		if(!req.cookies.ngotok) return next();
		auth.direct(res, next, req.cookies.ngotok);
	},
	function(req, res) {
		console.log('GET /');
		res.render('index.ejs');
	});

app.use('/login', loginRouter);
app.use('/student', studentHomeRouter);
app.use('/about', aboutRouter);

app.get('/logout', function(req, res) {
	res.clearCookie('ngotok');
	res.redirect('/');
});

// Listening on localhost:8080
app.listen(app.get('port'), function() {
	console.log("App running on localhost:", app.get('port'));
});