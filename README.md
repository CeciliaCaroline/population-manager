[![Build Status](https://travis-ci.org/CeciliaCaroline/population-manager.svg?branch=master)](https://travis-ci.org/CeciliaCaroline/population-manager)
[![Coverage Status](https://coveralls.io/repos/github/CeciliaCaroline/population-manager/badge.svg?branch=master)](https://coveralls.io/github/CeciliaCaroline/population-manager?branch=master)

## Population Management API

This is a system that contains a list of locations and the total number of residents in each location broken down by gender.

### Requirements
- Node (8.11.3)
- MongoDB

### Set up
Clone the repository

`https://github.com/CeciliaCaroline/population-manager.git`

Install dependencies

`npm install`

Start up mongoDB

`mongod`

Start up the server

`npm start`

Use postman to test the api requests on `localhost:3001`.

### Running Tests

You can run the application tests in the terminal with:

`npm test`

### Endpoints

Endpoint | Functionality
------------ | -------------
POST /api/v1/locations |Create a new location
GET /api/v1/locations |Create all locations
GET /api/v1/locations/:locationId | Get a specific location
UPDATE /api/v1/locations/:locationId | Update location name
DELETE /api/v1/locations/:locationId  | Delete location
POST /api/v1/locations/:locationId/subs  | Create sub location 

More detailed documentation of the API can be found [here](https://documenter.getpostman.com/view/2437198/RztpqTXu)