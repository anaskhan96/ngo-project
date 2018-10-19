'use strict';

const mongoose = require('mongoose');

const coursesSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('courses', coursesSchema, 'courses');