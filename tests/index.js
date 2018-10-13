'use strict';

let test = require('tape');
let request = require('supertest');
let app = require('../server');

let cookies = null;

test('First test', function(t) {
	t.end();
});

test('GET /', function(t) {
	request(app)
		.get('/')
		.expect('Content-Type', 'text/html; charset=utf-8')
		.expect(200)
		.end(function(err, res) {
			t.error(err, 'No error');
			t.end();
		});
});

test('GET /login', function(t) {
	request(app)
		.get('/login')
		.expect('Content-Type', 'text/html; charset=utf-8')
		.expect(200)
		.end(function(err, res) {
			t.error(err, 'No error');
			t.end();
		});
});

/*test('POST /login', function(t){
	request(app)
	.post('/login')
	.set('Accept', 'application/json')
	.send({"username":"anaskhan96", "password": "01fb15ecs035", "usertype":"student"})
	.expect('Content-Type', 'application/json')
	.expect(200)
	.end(function(err, res){
		t.error(err, 'No error');
		cookies = res.headers('Set-Cookie').pop().split(';')[0];
		t.end();
	});
});*/

test('GET /logout', function(t) {
	request(app)
		.get('/logout')
		.expect('Content-Type', 'text/plain; charset=utf-8')
		.expect(302)
		.end(function(err, res) {
			t.error(err, 'No error');
			t.end();
		});
});