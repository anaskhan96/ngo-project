# ngo-project

[![Build Status](https://travis-ci.org/anaskhan96/ngo-project.svg?branch=master)](https://travis-ci.org/anaskhan96/ngo-project)

![Image of the web-portal's homepage](https://i.imgur.com/QuYXnGU.jpg)

This project aims at being a complete, end-to-end solution for the functioning, and management of the school, which in our case is the Non-Profit Organization Sri Vidya Nikethan School, Bangalore.

Vidyanikethan is a not-for-profit organization founded in 1988 to improve the lives and livelihoods of people from the vulnerable, marginalized and under-developed sections of the society. There is a significant need of teachers, and volunteers at the school judging from the performance of the students, which is what called for this project, as an attempt to help the Non-Profit Organization.

The intent of this project is to provide an efficient tool from the persective of the 5 different types of users:
* Donors - To donate in the form of monetary, and non-monetary donations, keep track of the school's progress, etc.
* Volunteers - An intuituve portal to register, and manage their schedules with respect to the school.
* Teachers - Ability to manage the students they are teaching, add or remove videos to the E-Learning portal, etc.
* Students - Access to their assignments, projects, quizzes, as well an E-Learning portal comprising of the teachers' hand-picked videos.
* Management - A portal to handle all NPO, and school related activities. Managing volunteer registrations, volunteer schedules, managing teachers, donations, etc.


### Development Setup

+ Pre-requisites to be installed - `node`, `npm`, `mongodb`

+ Execute the following to setup the directory :-

```bash
git clone https://github.com/anaskhan96/ngo-project
cd ngo-project
npm install
```

+ Include the MongoDB and PayTM API details in a `.env` file in the root directory in the following form :-

```
DB_HOST=<hostname or ip addr>
DB_PORT=<port number>
DB_USER=<username>
DB_PASS=<password>
PAYTM_MID=<mid>
PAYTM_ACCTKEY=<acctkey>
```

+ Run `npm test` to run all the tests.

+ Run `npm start` to start the server at the specified port.

---

This project was built under the course *Software Engineering* in *PES University*.
