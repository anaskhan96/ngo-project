'use strict';

const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
	name: {
		type: String,
		unique: true
	},
	workDescription: {
		type: String
	},
	class: {
		type: String
	},
	days: {
		type: String
	},
	subject: {
		type: String
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('schedule', scheduleSchema, 'schedule');