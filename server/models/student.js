'use strict';

const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
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
});

module.exports = mongoose.model('student', studentSchema, 'student');