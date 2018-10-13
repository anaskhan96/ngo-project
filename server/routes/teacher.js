'use strict';

let express = require('express');
let auth = require('../middleware/auth');
let teacherRouter = express.Router();

teacherRouter.use((req, res, next) => {
	auth.authenticate(req, res, next, 'teacher');
});

teacherRouter.get('/', (req, res) => {
	console.log('GET /teacher');
	res.render('teacherHome.ejs', {
		user: req.user
	});
});

module.exports = teacherRouter;