'use strict';

let express = require('express');
let volunteerRegRouter = express.Router();

volunteerRegRouter.get('/', (req, res) => {
	console.log('GET /volunteer_registration');
	res.render('volunteer_registration.ejs');
});

volunteerRegRouter.post('/', (req, res) => {
	console.log('POST /volunteer_registration');
});

module.exports = volunteerRegRouter;