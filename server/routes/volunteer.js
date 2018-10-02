'use strict';

let express = require('express');
let auth = require('../middleware/auth');
let volunteerRouter = express.Router();

volunteerRouter.use(function(req, res, next) {
	auth.authenticate(req, res, next, 'volunteer');
});

volunteerRouter.get('/', function(req, res) {
	console.log('GET /volunteer');
	res.render('volunteerHome.ejs', {
		user: req.user
	});
});

module.exports = volunteerRouter;