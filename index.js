'use strict';

const chalk = require('chalk');
let server = require('./server');
/*const {
	exec
} = require('child_process');

// TLS tunnel to localhost
exec('ssh -R anas:80:localhost:8080 serveo.net', (err, stdout, stderr) => {
	if (err) throw err
	console.log(stdout);
});*/

server.listen(server.get('port'), function(err) {
	if (err) throw err;
	console.log(chalk.yellow('Server running on localhost:' + server.get('port')));
});