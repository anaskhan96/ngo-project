'use strict';

let express = require('express');
let auth = require('../middleware/auth');
let volunteerRouter = express.Router();

// authentication middleware
volunteerRouter.use((req, res, next) => {
	auth.authenticate(req, res, next, 'volunteer');
});

/*
	GET /volunteer
	response: view with variables { user (username) }
*/
volunteerRouter.get('/', (req, res) => {
	console.log('GET /volunteer');
	res.render('volunteerHome.ejs', {
		user: req.user
	});
});

module.exports = volunteerRouter;