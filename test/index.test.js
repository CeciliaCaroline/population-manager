'use strict';

const request = require('supertest');
const app = require('../index'); 
const expect = require('chai').expect;
const mongoose = require('mongoose');
const Location = require("../models/location").Location;
let location;


beforeEach(function(done) {
  mongoose.connect('mongodb://localhost:27017/test-Population-Manager');
  mongoose.connection.once('connected', () => {
    mongoose.connection.db.dropDatabase();
    
  });
  location = new Location({
    "name": "location-4",
    "total": "20",
    "females": "5",
    "males": "15"
  })
  location.save()

  done();
});


const location1 = {
    "name": "location-5",
    "total": "20",
    "females": "5",
    "males": "15"
}


describe('GET /locations/:locationId', function () {

  it('respond with json containing a single location', function (done) {
    let location = new Location({
        "name": "location-5",
        "total": "20",
        "females": "5",
        "males": "15"
    })
    location.save(err => {
        // console.log(location._id)
      request(app)
      .get(`/api/v1/locations/${location._id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    })
  
  });
});

  it('respond with location not found', function (done) {
      request(app)
          .get(`/api/v1/locations/1`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404, function(err, res) {
            if (err) { return done(err); }
              expect(res.body.message).to.equal("Location with id  1 not found");
              // done
              done();
          });
  });

  it('invalid URL', function (done) {
    request(app)
        .get(`/locations/1`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, done);
});

describe('POST /v1/locations', function() {

  it('should respond with 201 created', function(done) {
    request(app)
      .post('/api/v1/locations')
      .send(location1)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end( function(err, res) {
        if (err) { return done(err); }
        // Done
        done();
      });
  });

  let location = {
    "total": "20",
    "females": "5",
    "males": "15"
  }
  it('should respond with 400 not created', function(done) {
    request(app)
      .post('/api/v1/locations')
      .send(location)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done)
  });

});

describe('UPDATE /v1/locations/:locationId', function () {
  it('respond with updated location', function (done) {
    let location = new Location({
        "name": "location-6",
        "total": "20",
        "females": "5",
        "males": "15"
    })
    location.save(err => {
      request(app)
      .put(`/api/v1/locations/${location._id}`)
      .send({"name": "Kampala"})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    })
  });
});

describe('DELETE /v1/locations/:locationId', function () {

  it('respond with Deleted successfully', function (done) {
    let location = new Location({
        "name": "location-5",
        "total": "20",
        "females": "5",
        "males": "15"
    })
    location.save(err => {
      request(app)
      .delete(`/api/v1/locations/${location._id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    })
  })


    it('unsuccessful delete', function (done) {
      request(app)
      .delete(`/api/v1/locations/t`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
    })
  })

describe('POST /v1/locations/:locationId', function() {

    it('should respond with 201 created', function(done) {
        let location = new Location({
            "name": "location-5",
            "total": "20",
            "females": "5",
            "males": "15"
        })
        location.save(err => {
      request(app)
        .post(`/api/v1/locations/${location._id}/subs`)
        .send(location1)
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end( function(err, res) {
          if (err) { return done(err); }
          // Done
          done();
        });
    });
})
  
  
  });
  