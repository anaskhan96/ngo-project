'use strict';

let assert = require('assert');
let request = require('supertest');
let app = require('../server');

describe('Visitor test', () => {
	it('should return main page', (done) => {
		request(app)
			.get('/')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200)
			.end((err, res) => {
				if (err) assert.fail(err);
				done();
			});
	});

	it('should return login page', (done) => {
		request(app)
			.get('/login')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200)
			.end((err, res) => {
				if (err) assert.fail(err);
				done();
			});
	});

	it('should redirect to login page', (done) => {
		request(app)
			.get('/student')
			.expect('Content-Type', 'text/plain; charset=utf-8')
			.expect(302)
			.end((err, res) => {
				if (err) assert.fail(err);
				done();
			});
	});
});

describe('User (student) session test', () => {
	let cookies = null;

	before((done) => {
		setTimeout(() => done(), 1500);
	});

	it('should return success message post login', (done) => {
		request(app)
			.post('/login')
			.set('Accept', 'application/json')
			.send({
				'username': 'teststudent',
				'password': 'testpassword',
				'usertype': 'student'
			})
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200)
			.end((err, res) => {
				if (err) assert.fail(err);
				assert.equal(res.body.success, true);
				cookies = res.headers['set-cookie'].pop().split(';')[0];
				done();
			});
	});

	it('should return student homepage after login', (done) => {
		request(app)
			.get('/student')
			.set('Cookie', cookies)
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200)
			.end((err, res) => {
				if (err) assert.fail(err);
				done();
			})
	});

	it('should redirect to main page after logout', (done) => {
		request(app)
			.get('/logout')
			.expect('Content-Type', 'text/plain; charset=utf-8')
			.expect(302)
			.end((err, res) => {
				if (err) assert.fail(err);
				done();
			});
	})
});