'use strict';

const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
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
	}
}, {
	timestamps: true
});

studentSchema.pre('save', function(next) {
	let derivedKey = auth.generatePassword(this.password);
	this.password = derivedKey;
	next();
});

module.exports = mongoose.model('student', studentSchema, 'student');