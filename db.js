'use strict';

function initDB(callback) {
	let mongoClient = require('mongodb').MongoClient;
	mongoClient.connect('mongodb://localhost:27017', function(err, client) {
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