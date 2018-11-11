# ngo-project

[![Build Status](https://travis-ci.org/anaskhan96/ngo-project.svg?branch=master)](https://travis-ci.org/anaskhan96/ngo-project)

### Development Setup

+ Pre-requisites to be installed - `node`, `npm`, `mongodb`

+ Execute the following to setup the directory :-

```bash
git clone https://github.com/anaskhan96/ngo-project
cd ngo-project
npm install
```

+ Include the db details in a `.env` file in the root directory in the following form :-

```
DB_USER=<username>
DB_PASS=<password>
```

+ Run `npm test` to run all the tests.

+ Run `npm start` to start the server at the specified port.