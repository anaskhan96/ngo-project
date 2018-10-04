'use strict';

let server = require('./server');

server.listen(server.get('port'), function(err) {
	if (err) throw err;
	console.log('Server running on localhost:' + server.get('port'));
});