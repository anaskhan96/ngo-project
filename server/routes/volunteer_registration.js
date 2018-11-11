'use strict';

let express = require('express');
const Volunteer = require('../models/volunteer');
let volunteerRegRouter = express.Router();
let auth = require('../middleware/auth');
const chalk = require('chalk');

/*
	GET /volunteer_registration
	response: view
*/
volunteerRegRouter.get('/', (req, res) => {
	console.log(chalk.green('GET ' + chalk.blue('/volunteer_registration')));
	res.render('volunteer_registration.ejs');
});

/*
	POST /volunteer_registration
	request body: json { name, email, username, password, class, subject, days }
	response: set-cookie and json { success (boolean) }
*/
volunteerRegRouter.post('/', (req, res) => {
	console.log(chalk.cyan('POST ' + chalk.blue('/volunteer_registration')));
	let volunteer = new Volunteer({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		classPref: req.body.class,
		subjectPref: req.body.subject,
		daysPref: req.body.days
	});
	volunteer.save((err, result) => {
		if (err) {
			let errorMsg = 'Registration failed! Please contact management';
			if (err.code == 11000 && err.errmsg.includes('username')) errorMsg = 'This username has been already taken';
			else if (err.code = 11000 && err.errmsg.includes('email')) errorMsg = 'This email has been already taken';
			res.json({
				success: false,
				errorMsg: errorMsg
			});
		} else {
			console.log(chalk.yellow('Added volunteer: ' + result.username));
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