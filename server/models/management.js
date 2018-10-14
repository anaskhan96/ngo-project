'use strict';

const mongoose = require('mongoose');

const managementSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
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

module.exports = mongoose.model('management', managementSchema, 'management');