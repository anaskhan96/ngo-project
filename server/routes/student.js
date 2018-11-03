'use strict';

let express = require('express');
let auth = require('../middleware/auth');
let studentRouter = express.Router();
let Student = require('../models/student');
let Videos = require('../models/videos');

studentRouter.use((req, res, next) => {
	auth.authenticate(req, res, next, 'student');
});

studentRouter.get('/', (req, res) => {
	console.log('GET /student');
	res.render('student_dashboard.ejs', {
		user: req.user
	});
});

studentRouter.get('/details', (req, res) => {
	console.log('GET /student/details');
	Student.findOne({
		username: req.user.username
	}, (err, student) => {
		if (err) throw err;
		if (student == null) return res.json({
			success: false
		});
		res.json({
			success: true,
			name: student.name,
			email: student.email,
			username: student.username
		});
	});
});

studentRouter.get('/videos', (req, res) => {
	console.log('GET /student/videos');
	Student.findOne({
		username: req.user.username
	}).populate('videos').exec((err, student) => {
		if (err) throw err;
		if (student == null) return res.json({
			success: false
		});
		if (!student.videos || student.videos.length == 0) return res.json({
			success: false
		});
		let videos = [];
		for (let i = 0; i < student.videos.length; i++) {
			videos.push({
				name: student.videos[i].name,
				link: student.videos[i].link
			});
		}
		res.json({
			success: true,
			videos: videos
		});
	});
});

module.exports = studentRouter;