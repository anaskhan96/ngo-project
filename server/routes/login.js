'use strict';

let express = require('express');
let auth = require('../middleware/auth');
let loginRouter = express.Router();

// for demo purposes
let loginTriesLimit = 0;

loginRouter.get('/', function(req, res) {
	console.log('GET /login');
	res.render('temp_login.ejs');
});

loginRouter.post('/', function(req, res) {
	console.log('POST /login');
	// demo purposes
	if(loginTriesLimit == 3){
		loginTriesLimit = 0;
		// hence redirecting to the home page without setting the cookie
		res.json({
			success: true
		});
		return;
	}
	auth.authorize(req.body, function(err, result) {
		if (err) {
			loginTriesLimit++;
			res.json({
				success: false
			});
		} else {
			res.cookie('ngotok', result, {
				httpOnly: true
			});
			res.json({
				success: true,
				token: result
			});
		}
	});
});

module.exports = loginRouter;