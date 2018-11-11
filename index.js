'use strict';

const chalk = require('chalk');
let server = require('./server');

server.listen(server.get('port'), function(err) {
	if (err) throw err;
	console.log(chalk.yellow('Server running on localhost:' + server.get('port')));
});