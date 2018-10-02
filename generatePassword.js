'use strict';

let crypto = require('crypto');
let plaintext = process.argv[2];
console.log('Plaintext: ' + plaintext);
let salt = crypto.randomBytes(16).toString('hex');
console.log('Generated Salt: ' + salt);
let key = crypto.pbkdf2Sync(plaintext, salt, 10000, 64, 'sha512').toString('hex');
console.log('Generated Key: ' + key);
console.log('Password: ' + salt + '+' + key);