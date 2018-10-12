'use strict';

require('dotenv').config();
function initDB(callback) {
	let mongoClient = require('mongodb').MongoClient;
	mongoClient.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@anask.xyz:27017', function(err, client) {
		if (!err) {
			console.log('Connected to mongo database at port 27017');
		} else {
			throw err;
		}
		callback(client.db('ngodb'));
	});
}

module.exports = {
	initDB: initDB
};