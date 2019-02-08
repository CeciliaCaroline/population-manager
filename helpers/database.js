'use strict';
const mongoose = require("mongoose");
// const dbConfig = require("../database.config");
require('dotenv').config()


mongoose.Promise = global.Promise;

module.exports.databaseSetUp = () => {
let DATABASE_URL = "mongodb://localhost:27017/population-Manager";

if (process.env.NODE_ENV === "testing") {
  DATABASE_URL = process.env.TEST_DATABASE_URI;
}

// Connecting to the database
mongoose
  .connect(
    DATABASE_URL,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
}