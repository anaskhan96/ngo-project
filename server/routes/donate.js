'use strict';

let express = require('express');
let donateRouter = express.Router();
let checksum = require('../middleware/checksum/checksum');
require('dotenv').config();

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
		callback(true, details);
	});
}

donateRouter.post('/payment', (req, res) => {
	console.log('POST /donate/payment');
	console.log(req.body);
	res.send('done');
});

module.exports = donateRouter;