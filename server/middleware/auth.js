'use strict';

let jwt = require('jwt-simple');
const secret = 'xxxngoxxx'; // should obviously think of a better secret

function authenticate(token){
	return jwt.decode(token, secret);
	// check user against database and then return the info
}

function authorize(user){
	// check against database
	return jwt.encode(user, secret);
}

module.exports = {
	authenticate: authenticate,
	authorize: authorize
};