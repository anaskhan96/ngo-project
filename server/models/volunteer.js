'use strict';

const mongoose = require('mongoose');

const volunteerSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	classPref: {
		type: String,
		default: "any"
	},
	subjectPref: {
		type: String,
		default: "any"
	},
	timePref: {
		type: String,
		default: "any"
	}
});

module.exports = mongoose.model('volunteer', volunteerSchema, 'volunteer');