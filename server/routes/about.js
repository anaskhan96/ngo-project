'use strict';

let express = require('express');
let aboutRouter = express.Router();

/*aboutRouter.use(function (req, res, next){
	console.log('here too man');
});*/

aboutRouter.get('/', function (req, res) {
	console.log('GET /about');
	res.render('about.ejs');
});

module.exports = aboutRouter;