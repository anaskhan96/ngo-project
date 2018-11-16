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
		type: String,
		default: "any"
	},
	days: {
		type: String,
		default: "any"
	},
	subject: {
		type: String,
		default: "any"
	},
	volunteersOpted: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'volunteer'
	}]
}, {
	timestamps: true
});

module.exports = mongoose.model('schedule', scheduleSchema, 'schedule');