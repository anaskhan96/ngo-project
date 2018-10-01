'use strict';

// listing all imports
let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let loginRouter = require('./routes/login');
let studentHomeRouter = require('./routes/studentHome');
let aboutRouter = require('./routes/about');

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

app.get('/', function(req, res) {
	console.log('GET /');
	res.render('index.ejs');
	// Or authenticate with token and redirect to home
});

app.use('/login', loginRouter);
app.use('/student', studentHomeRouter);
app.use('/about', aboutRouter);

// Listening on localhost:8080
app.listen(app.get('port'), function() {
	console.log("App running on localhost:", app.get('port'));
});