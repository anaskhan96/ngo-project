'use strict';

let express = require('express');
let auth = require('../middleware/auth');
let studentHomeRouter = express.Router();

studentHomeRouter.use(function(req, res, next) {
	auth.authenticate(req, res, next, 'student');
});

studentHomeRouter.get('/', function(req, res) {
	console.log('GET /student');
	res.render('studentHome.ejs', {
		user: req.user
	});
});

module.exports = studentHomeRouter;