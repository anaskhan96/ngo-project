'use strict';

const mongoose = require('mongoose');

const videosSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'teacher'
	},
	comments: [{
		student: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'students'
		},
		text: {
			type: String
		}
	}]
}, {
	timestamps: true
});

videosSchema.post('remove', function(doc) {
	// remove the video's references from all student documents
});

module.exports = mongoose.model('videos', videosSchema, 'videos');