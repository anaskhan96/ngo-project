'use strict';

let jwt = require('jwt-simple');
let crypto = require('crypto');
const secret = 'xxxngoxxx'; // should obviously think of a better secret

function authenticate(req, res, next, usertype) {
	if (!req.cookies.ngotok) return res.redirect('/login');
	let user = null;
	try {
		user = jwt.decode(req.cookies.ngotok, secret);
	} catch (err) {
		return res.redirect('/login');
	}
	if (user.usertype != usertype) return res.redirect('/login');
	req.user = {
		username: user.username
		// would later fill this with details from db
	};
	next();
}

function authorize(user, callback) {
	let usertype = require('../models/' + user.usertype);
	usertype.findOne({
		username: user.username
	}, (err, res) => {
		if (err) throw err;
		if (res == null) return callback('not found', null);
		let saltKey = res.password.split('+');
		if (!matchPassword(user.password, saltKey[0], saltKey[1]))
			callback('not found', null);
		else
			callback(null, jwt.encode({
				username: user.username,
				usertype: user.usertype
			}, secret));
	});
}

function direct(res, next, token) {
	let user = null;
	try {
		user = jwt.decode(token, secret);
	} catch (err) {
		return next();
	}
	res.redirect('/' + user.usertype);
}

function matchPassword(plaintext, salt, key) {
	let derivedKey = crypto.pbkdf2Sync(plaintext, salt, 10000, 32, 'sha512').toString('hex');
	return key == derivedKey;
}

module.exports = {
	authenticate: authenticate,
	authorize: authorize,
	direct: direct
};