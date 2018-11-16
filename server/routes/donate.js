'use strict';

require('dotenv').config();
let express = require('express');
let donateRouter = express.Router();
let checksum = require('../middleware/checksum/checksum');
let Donations = require('../models/donations');
const chalk = require('chalk');

/*
	GET /donate
	response: view
*/
donateRouter.get('/', (req, res) => {
	console.log(chalk.green('GET ' + chalk.blue('/donate')));
	res.render('donate.ejs');
});

/*
	POST /donate
	request body: json { name, email, mobile, amount (if monetary), comments (if non-monetary) }
	response: view with variables { success (boolean) }
*/
donateRouter.post('/', (req, res) => {
	console.log(chalk.cyan('POST ' + chalk.blue('/donate')));
	if (!req.body.isMonetary) {
		let donation = new Donations({
			name: req.body.name,
			email: req.body.email,
			mobile: req.body.mobile,
			paymentMode: 'NonMonetary',
			comments: req.body.comments
		});
		donation.save((err, result) => {
			if (err) {
				console.log(chalk.red(err));
				return res.render('postDonation.ejs', {
					success: false
				});
			}
			res.render('postDonation.ejs', {
				success: true
			});
		});
	} else {
		initiatePayment(req.body, function(success, details) {
			res.json({
				success: success,
				details: details
			});
		});
	}
});

function initiatePayment(customer, callback) {
	let orderID = 'order' + Date.now();
	let customerID = 'cust' + Date.now();
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
			console.log(chalk.red(err));
			return callback(false, null);
		}
		details.CHECKSUMHASH = generatedChecksum;
		let donation = new Donations({
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
		donation.save((err, res) => {
			if (err) {
				console.log(chalk.red(err));
				return callback(false, null);
			}
			callback(true, details);
		});
	});
}

/*
	POST /donate/payment, callback function from PayTM's website
	request body: transaction details in a json
	response: same as POST /donate
*/
donateRouter.post('/payment', (req, res) => {
	console.log(chalk.cyan('POST ' + chalk.blue('/donate/payment')));
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
				console.log(chalk.red(err));
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

donateRouter.get('/received', (req, res) => {
	console.log(chalk.green('GET ' + chalk.blue('/donate/received')));
	Donations.find({
		"transactionDetails.STATUS": "TXN_SUCCESS"
	}, (err, donations) => {
		if (err) throw err;
		let totalAmount = 0;
		for (let i = 0; i < donations.length; i++) totalAmount += donations[i].amountDonated;
		res.json({
			amount: totalAmount
		});
	});
});

module.exports = donateRouter;