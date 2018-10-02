'use strict';

let express = require('express');
let auth = require('../middleware/auth');
let studentHomeRouter = express.Router();

studentHomeRouter.use(function(req, res, next) {
	if (!req.cookies.ngotok) {
		res.redirect('/login');
	} else {
		req.user = auth.authenticate(req.cookies.ngotok);
		next();
	}
});

studentHomeRouter.get('/', function(req, res) {
	console.log('GET /student');
	res.render('studentHome.ejs', {
		user: req.user
	});
});

module.exports = studentHomeRouter;