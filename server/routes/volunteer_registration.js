'use strict';

let express = require('express');
const Volunteer = require('../models/volunteer');
let volunteerRegRouter = express.Router();
let auth = require('../middleware/auth');

volunteerRegRouter.get('/', (req, res) => {
	console.log('GET /volunteer_registration');
	res.render('volunteer_registration.ejs');
});

volunteerRegRouter.post('/', (req, res) => {
	console.log('POST /volunteer_registration');
	let volunteer = new Volunteer({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		classPref: req.body.class,
		subjectPref: req.body.subject,
		timePref: req.body.timePref
	});
	volunteer.save(function(err, result) {
		if (err) res.json({
			success: false,
			errorMsg: err.toString()
		});
		else {
			console.log(result.username);
			let token = auth.generateToken(result.username, 'volunteer');
			res.cookie('ngotok', token, {
				httpOnly: true
			});
			res.json({
				success: true
			});
		}
	});
});

module.exports = volunteerRegRouter;