'use strict';

let assert = require('assert');
let request = require('supertest');
let app = require('../server');

describe('Visitor test', function() {
	it('should return /', function(done) {
		request(app)
			.get('/')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200)
			.end(function(err, res) {
				if (err) assert.fail(err);
				done();
			});
	});

	it('should return /login', function(done) {
		request(app)
			.get('/login')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200)
			.end(function(err, res) {
				if (err) assert.fail(err);
				done();
			});
	});

	it('should redirect to /login', function() {
		request(app)
			.get('/student')
			.expect('Content-Type', 'text/plain; charset=utf-8')
			.expect(302)
			.end(function(err, res) {
				if (err) assert.fail(err);
			});
	});
});