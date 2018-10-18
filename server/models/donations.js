'use strict';

const mongoose = require('mongoose');

const paymentTypes = Object.freeze({
	NonMonetary: 0,
	Paytm: 1,
	UPI: 2,
	CreditCard: 3,
	DebitCard: 4,
	NetBanking: 5
});

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
	paymentType: {
		type: paymentTypes,
		required: true
	},
	amountDonated: {
		type: Number,
		required: isMonetary
	},
	comments: {
		type: String
	}
});

function isMonetary() {
	return this.paymentType != paymentTypes.NonMonetary;
}

module.exports = mongoose.model('donations', donationsSchema, 'donations');