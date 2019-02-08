"use strict";

const express = require("express");
const jsonParser = require("body-parser").json;
const routes = require("./routes");
const logger = require("morgan");
const cors = require('cors');
const {handle404Errors, handleErrors} = require("./helpers/error_handlers");
const {databaseSetUp} = require("./helpers/database");
const mongoose = require("mongoose");
require('dotenv').config()

mongoose.Promise = global.Promise;
const app = express()
let port = 3001


app.use(logger("dev"));
app.use(jsonParser());
app.use(cors())

databaseSetUp();
if (process.env.NODE_ENV === 'testing') {
    port = process.env.TEST_PORT
  }

app.use("/api/v1", routes);
// catch 404 error and forward to error handler
app.use(handle404Errors());

// Error Handler
app.use(handleErrors());


app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
  
  module.exports = app;