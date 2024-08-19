<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

## Description

This is a Node.js application built using the NestJS framework, following clean architecture principles, SOLID principles, and the design pattern "Dependency Injection (DI)" to ensure maintainability and scalability.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20.16.0)
- [npm](https://www.npmjs.com/) (version 10.8.1)
- [MongoDB](https://www.mongodb.com/) (Ensure MongoDB is running locally or use a remote connection)

## Installation

1. Clone the repository:

	```bash
   git clone git@github.com:gardnor/singuTest.git
   cd <repository-directory>
```
2. Install the dependencies:

	```bash
npm install
```
3. Set up environment variables:

 - Copy the .env.example file and rename it to .env.
 - Update the MONGO_URI variable in the .env file with your MongoDB connection string (you can use mine, it is in .env.example).


## development watch mode
1. Run in terminal

	```bash
npm run start:dev
```
a. The application will run by default on http://localhost:3000. 


## Unit tests, e2e and coverage
1. To run all tests, you can run:

	```bash
npm run test
npm run test:e2e
npm run test:cov
```

### Stay in touch

- Author - [Eduardo](https://github.com/gardnor)

### License

Nest is [MIT licensed](LICENSE).
