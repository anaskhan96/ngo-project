'use strict';

let express = require('express');
let auth = require('../middleware/auth');
let managementRouter = express.Router();
let Management = require('../models/management');
let Schedule = require('../models/schedule');

// authentication middleware
managementRouter.use((req, res, next) => {
	auth.authenticate(req, res, next, 'management');
});

/*
	GET /management
	response: view with variables { user (username) }
*/
managementRouter.get('/', (req, res) => {
	console.log('GET /management');
	res.render('managementHome.ejs', {
		user: req.user
	});
});

/*
	GET /management/details
	response: json { success (boolean), name, email, username }
*/
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

/*
	GET /management/users/student, /management/users/teacher
	response: json { success (boolean), users { name, email, username } }
*/
managementRouter.get('/users/:usertype', (req, res) => {
	console.log('GET /management/users');
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

/*
	POST /management/addUser/student, /management/addUser/teacher
	request body: json { name, email, username, password, students {} (for teachers) }
	response: json { success (boolean) }
*/
managementRouter.post('/addUser/:usertype', (req, res) => {
	console.log('POST /management/addUser');
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

/*
	POST /management/deleteUser/student, /management/deleteUser/teacher
	request body: json { username }
	response: json { success (boolean) }
*/
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

/*
	GET /management/schedules
	response: json { name, workDescription, class, days, subject, volunteersOpted (array of volunteer usernames) }
*/
managementRouter.get('/schedules', (req, res) => {
	console.log('GET /management/schedules');
	Schedule.find().populate('volunteersOpted').exec((err, schedules) => {
		if (err) throw err;
		let finalSchedules = [];
		schedules.forEach((schedule) => {
			let sched = schedule.toObject();
			for (let i = 0; i < sched.volunteersOpted.length; i++)
				sched.volunteersOpted[i] = sched.volunteersOpted[i].username;
			finalSchedules.push(sched);
		});
		res.json(finalSchedules);
	});
});

/*
	POST /management/addSchedule
	request body: json { name, workDescription, class, days, subject }
	response: json { success (boolean) }
*/
managementRouter.post('/addSchedule', (req, res) => {
	console.log('POST /management/addSchedule');
	let schedule = new Schedule(req.body);
	schedule.save((err, result) => {
		if (err) {
			console.log(err);
			return res.json({
				success: false,
				errorMsg: err.toString()
			});
		}
		res.json({
			success: true
		});
	});
});

/*
	POST /management/deleteSchedule
	request body: json { name }
	response: json { success (boolean) }
*/
managementRouter.post('/deleteSchedule', (req, res) => {
	console.log('POST /management/deleteSchedule');
	Schedule.deleteOne({
		name: req.body.name
	}, (err) => {
		if (err) {
			console.log(err);
			return res.json({
				success: false,
				errorMsg: err.toString()
			});
		}
		res.json({
			success: true
		});
	});
});

module.exports = managementRouter;