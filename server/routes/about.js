'use strict';

let express = require('express');
let aboutRouter = express.Router();

aboutRouter.get('/', function (req, res) {
	console.log('GET /about');
	res.render('about.ejs');
});

module.exports = aboutRouter;