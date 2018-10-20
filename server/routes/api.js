'use strict';

let express = require('express');
let auth = require('../middleware/auth');
let graphqlHTTP = require('express-graphql');
let {
	buildSchema
} = require('graphql');
let apiRouter = express.Router();

let schema = buildSchema(`
	type Query {
		hello: String	
	}
`);

let root = {
	hello: () => {
		return 'Hello, World!';
	}
};

apiRouter.use('/', (req, res, next) => {
	console.log('GET /api', req.body);
	next();
});

apiRouter.use('/', graphqlHTTP({
	schema: schema,
	rootValue: root
}));

module.exports = apiRouter;