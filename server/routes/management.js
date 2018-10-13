'use strict';

let express = require('express');
let auth = require('../middleware/auth');
let managementRouter = express.Router();

managementRouter.use((req, res, next) => {
	auth.authenticate(req, res, next, 'management');
});

managementRouter.get('/', (req, res) => {
	console.log('GET /management');
	res.render('managementHome.ejs', {
		user: req.user
	});
});

module.exports = managementRouter;