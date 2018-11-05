'use strict';

let express = require('express');
let auth = require('../middleware/auth');
let managementRouter = express.Router();
let Management = require('../models/management');
let Schedule = require('../models/schedule');

managementRouter.use((req, res, next) => {
	auth.authenticate(req, res, next, 'management');
});

managementRouter.get('/', (req, res) => {
	console.log('GET /management');
	res.render('managementHome.ejs', {
		user: req.user
	});
});

managementRouter.get('/details', (req, res) => {
	console.log('GET /management/details');
	Management.findOne({
		username: req.user.username
	}, (err, management) => {
		if (err) throw err;
		if (management == null) return res.json({
			success: false
		});
		res.json({
			success: true,
			name: management.name,
			email: management.email,
			username: management.username
		});
	});
});

managementRouter.get('/users/:usertype', (req, res) => {
	console.log('GET /users');
	if (req.params.usertype == 'management') return res.json({
		success: false
	});
	let Usertype = require('../models/' + req.params.usertype);
	Usertype.find().exec((err, results) => {
		let users = [];
		for (let i = 0; i < results.length; i++) {
			users.push({
				name: results[i].name,
				username: results[i].username,
				email: results[i].email
			});
		}
		res.json({
			success: true,
			users: users
		});
	});
});

managementRouter.post('/addUser/:usertype', (req, res) => {
	console.log('POST /management/add');
	if (req.params.usertype != "student" && req.params.usertype != "teacher") return res.json({
		success: false
	});
	let Usertype = require('../models/' + req.params.usertype);
	let user = new Usertype({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});
	if (req.params.usertype == 'teacher') {
		// req.body.students contain all the usernames
		if (req.body.students) {
			for (let i = 0; i < req.body.students.length; i++) {
				Student.findOne({
					username: req.body.students[i]
				}, (err, student) => {
					if (!err && student != null) user.students.push(student);
				});
			}
		}
	}
	user.save((err, result) => {
		if (err) return res.json({
			success: false,
			errorMsg: err.toString()
		});
		console.log('Added: ', result.username);
		res.json({
			success: true
		});
	});
});

managementRouter.post('/deleteUser/:usertype', (req, res) => {
	console.log('POST /management/delete');
	if (req.params.usertype != "student" && req.params.usertype != "teacher") return res.json({
		success: false
	});
	let Usertype = require('../models/' + req.params.usertype);
	Usertype.deleteOne({
		username: req.body.username
	}, (err) => {
		if (err) return res.json({
			success: false,
			errorMsg: err.toString()
		});
		res.json({
			success: true
		});
	});
});

managementRouter.get('/schedules', (req, res) => {
	console.log('GET /management/schedules');
	Schedule.find().exec((err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

module.exports = managementRouter;