'use strict';

let express = require('express');
let auth = require('../middleware/auth');
let loginRouter = express.Router();

loginRouter.get('/', function(req, res) {
	console.log('GET /login');
	res.render('login.ejs');
});

loginRouter.post('/', function(req, res) {
	console.log('POST /login');
	auth.authorize(req.body, function(err, result) {
		if (err) res.json({
			success: false
		});
		else {
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