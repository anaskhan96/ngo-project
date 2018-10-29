# ngo-project

### Development Setup

+ Pre-requisites to be installed - `node`, `npm`

+ Execute the following to setup the directory :-

```bash
git clone https://github.com/anaskhan96/ngo-project
cd ngo-project
npm install
```

+ ~~Include the db details in a `.env` file in the root directory in the following form :-~~ (not needed for local storage, use `mongorestore` inside the folder 'dump' to set up local db)

```
DB_USER=<username>
DB_PASS=<password>
```

+ Run `npm test` to run all the tests.

+ Run `npm start` to start the server at the specified port.