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
	let token = auth.authorize(req.body);
	res.json({
		token: token
	});
});

module.exports = loginRouter;