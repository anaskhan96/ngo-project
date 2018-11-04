var http = require('http');
var checksum_lib = require('./checksum.js');

http.createServer(function (req, res) {

	var params 						= {};
	params['MID'] 					= 'XXXXXXXXXXXXXXXXXXXX';
	params['WEBSITE']				= 'XXXXXXXXXX';
	params['CHANNEL_ID']			= 'WEB';
	params['INDUSTRY_TYPE_ID']	= 'Retail';
	params['ORDER_ID']			= 'TEST_'  + new Date().getTime();
	params['CUST_ID'] 			= 'Customer001';
	params['TXN_AMOUNT']			= '1.00';
	params['CALLBACK_URL']		= 'https://pg-staging.paytm.in/MerchantSite/bankResponse';
	params['EMAIL']				= 'abc@mailinator.com';
	params['MOBILE_NO']			= '7777777777';

	checksum_lib.genchecksum(params, "XXXXXXXXXXXXXXXX", function (err, checksum) {

		var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
		// var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for prod
		
		var form_fields = "";
		for(var x in params){
			form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"' >";
		}
		form_fields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' >";

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields+'</form><script type="text/javascript">document.f1.submit();</script></body></html>');
		res.end();
	});

}).listen(8080);
