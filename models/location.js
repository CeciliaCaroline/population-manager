"use strict";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String, unique: true, required: true },
  females: { type: Number, default: 0 },
  males: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  subLocations: []
});

LocationSchema.pre("save", function(next) {
  const location = this;
  this.total = location.females + location.males;
  next();
});

const Location = mongoose.model("Location", LocationSchema);

module.exports.Location = Location;
