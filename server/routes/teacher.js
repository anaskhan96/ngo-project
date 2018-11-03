'use strict';

let express = require('express');
let auth = require('../middleware/auth');
let teacherRouter = express.Router();
let Teacher = require('../models/teacher');
let Videos = require('../models/videos');
let Student = require('../models/student');

teacherRouter.use((req, res, next) => {
	auth.authenticate(req, res, next, 'teacher');
});

teacherRouter.get('/', (req, res) => {
	console.log('GET /teacher');
	res.render('teacherHome.ejs', {
		user: req.user
	});
});

teacherRouter.get('/details', (req, res) => {
	console.log('GET /teacher/details');
	Teacher.findOne({
		username: req.user.username
	}, (err, teacher) => {
		if (err) throw err;
		if (teacher == null) return res.json({
			success: false
		});
		res.json({
			success: true,
			name: teacher.name,
			email: teacher.email,
			username: teacher.username
		});
	});
});

teacherRouter.get('/videos', (req, res) => {
	console.log('GET /teacher/videos');
	Videos.find().populate({
		path: 'postedBy',
		match: {
			username: req.user.username
		}
	}).exec((err, videos) => {
		if (err) throw err;
		if (videos == null) return res.json({
			success: false
		});
		let vids = [];
		for (let i = 0; i < videos.length; i++) {
			vids.push({
				name: videos.name,
				link: videos.link
			});
		}
		res.json({
			success: true,
			videos: vids
		});
	});
});

teacherRouter.post('/addVideo', (req, res) => {
	console.log('POST /teacher/addVideo');
	Teacher.findOne({
		username: req.user.username
	}).populate('students').exec((err, teacher) => {
		if (err) throw err;
		if (teacher == null) return res.json({
			success: false
		});
		let video = new Videos({
			name: req.body.name,
			link: req.body.link
		});
		video.save((err, result) => {
			if (err) throw err;
			for (let i = 0; i < teacher.students.length; i++) {
				Student.findOneAndUpdate({
					username: teacher.students[i].username
				}, {
					$push: {
						videos: result
					}
				}, (err, updatedStudent) => {
					if (err) throw err;
				});
			}
		});
		res.json({
			success: true,
			name: video.name,
			link: video.link
		});
	});
});

teacherRouter.post('/deleteVideo', (req, res) => {
	console.log('POST /teacher/deleteVideo');
});

module.exports = teacherRouter;