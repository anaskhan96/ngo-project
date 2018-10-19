'use strict';

const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'courses',
		required: true
	},
	description: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('comments', commentsSchema, 'comments');