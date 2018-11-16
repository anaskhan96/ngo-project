'use strict';

const mongoose = require('mongoose');
let auth = require('../middleware/auth');

const teacherSchema = mongoose.Schema({
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
	students: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'student'
	}]
}, {
	timestamps: true
});

teacherSchema.pre('save', function(next) {
	let derivedKey = auth.generatePassword(this.password);
	this.password = derivedKey;
	next();
});

teacherSchema.post('deleteOne', function(doc) {
	// need to remove videos posted by the teacher
});

module.exports = mongoose.model('teacher', teacherSchema, 'teacher');