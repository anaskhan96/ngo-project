'use strict';

require('dotenv').config();
let express = require('express');
let donateRouter = express.Router();
let checksum = require('../middleware/checksum/checksum');
let Donations = require('../models/donations');

donateRouter.get('/', (req, res) => {
	console.log('GET /donate');
	res.render('donate.ejs');
});

donateRouter.post('/', (req, res) => {
	console.log('POST /donate');
	initiatePayment(req.body, function(success, details) {
		res.json({
			success: success,
			details: details
		});
	});
});

function initiatePayment(customer, callback) {
	let orderID = 'order' + Math.floor(Math.random() * 1000000).toString();
	let customerID = 'cust' + Math.floor(Math.random() * 1000000).toString();
	let amount = customer.amount;
	if (customer.amount.indexOf('.') < 0) amount += '.00';
	let details = {
		MID: process.env.PAYTM_MID,
		ORDER_ID: orderID,
		CHANNEL_ID: 'WEB',
		CUST_ID: customerID,
		MOBILE_NO: customer.mobile,
		EMAIL: customer.email,
		TXN_AMOUNT: amount,
		WEBSITE: 'WEBSTAGING',
		INDUSTRY_TYPE_ID: 'Retail',
		CALLBACK_URL: 'https://anas.serveo.net/donate/payment'
	}
	checksum.genchecksum(details, process.env.PAYTM_ACCTKEY, function(err, generatedChecksum) {
		if (err) {
			console.log(err);
			return callback(false, null);
		}
		details.CHECKSUMHASH = generatedChecksum;
		let donations = new Donations({
			name: customer.name,
			email: customer.email,
			mobile: customer.mobile,
			amountDonated: amount,
			transactionDetails: {
				ORDERID: orderID,
				STATUS: 'PENDING',
				CHECKSUMHASH: generatedChecksum
			}
		});
		donations.save((err, res) => {
			if (err) {
				console.log(err);
				return callback(false, null);
			}
			callback(true, details);
		});
	});
}

donateRouter.post('/payment', (req, res) => {
	console.log('POST /donate/payment');
	Donations.findOne({
		"transactionDetails.ORDERID": req.body.ORDERID
	}, (err, donation) => {
		if (err) throw err;
		/*if (donation.transactionDetails.CHECKSUMHASH != req.body.CHECKSUMHASH) {
			console.log(donation);
			return res.render('postDonation.ejs', {
				success: false
			});
		}*/
		donation.transactionDetails.TXNID = req.body.TXNID;
		donation.transactionDetails.STATUS = req.body.STATUS;
		donation.paymentMode = req.body.PAYMENTMODE;
		donation.save((err, result) => {
			if (err) {
				console.log(err);
				return res.render('postDonation.ejs', {
					success: false
				});
			}
			res.render('postDonation.ejs', {
				success: true
			});
		});
	});
});

module.exports = donateRouter;