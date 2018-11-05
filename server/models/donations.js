'use strict';

const mongoose = require('mongoose');

const donationsSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	mobile: {
		type: String
	},
	paymentMode: {
		type: String
	},
	amountDonated: {
		type: Number
	},
	transactionDetails: {
		ORDERID: {
			type: String
		},
		TXNID: {
			type: String
		},
		STATUS: {
			type: String
		},
		CHECKSUMHASH: {
			type: String
		}
	},
	comments: {
		type: String
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('donations', donationsSchema, 'donations');