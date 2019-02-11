"use strict";

const express = require("express");
const router = express.Router();
const Location = require("./models/location").Location;


// Create a new location
router.post("/locations", (req, res) => {
      if (!req.body.name) {
    return res.status(400).send({
      message: " Location name can not be empty"
    });
  }
  let location = new Location(req.body);
  location
    .save()
    .then(data => {
      return res.status(201).send({
        name: data.name,
        females: data.females,
        males: data.males,
        total: data.total,
        _id: data._id,
        request: {
          type: "GET",
          url: `http://localhost:3001/api/v1/locations/${data._id}`
        },
        message: "Location successfully created"
      });
    })
    .catch(err => {
      if (err.code === 11000) {
        return res.status(400).send({
          message: "This location name already exists."
        });
      }
      return res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Location."
      });
    });
  });
  
  // GET all locations
router.get("/locations", (req, res) => {
    Location.find()
    // .select("name females males total _id")
    .then(locations => {
      if (!locations.length) {
        return res
          .status(200)
          .send({ message: "No locations have been found", status: "success" });
      }
      const response = {
        locations: locations.map(location => {
          return {
            name: location.name,
            females: location.females,
            males: location.males,
            sublocations: location.subLocations,
            _id: location._id,
            request: {
              type: "GET",
              url: `http://localhost:3001/api/v1/locations/${location._id}`
            }
          };
        }),
        count: locations.length,
        status: "success"
      };

      return res.status(200).send({ response });
    })

    .catch(error => {
      return res.status(500).send({
        message: error.message || "An error occurred while retrieving location."
      });
    });
  });

  // GET one location
router.get("/locations/:locationId", (req, res) => {
    Location.findById(req.params.locationId)
    .select("name females males total _id")
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message: `Location with id  ${req.params.locationId} not found`
        });
      }
      res.status(200).send({
        location,
        request: {
          type: "GET",
          url: `http://localhost:3001/api/v1/locations`
        }
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Location with id  ${req.params.locationId} not found`
        });
      }
      return res.status(500).send({
        message: "Error retrieving location with id " + req.params.locationId
      });
    });
});

// UPDATE specific location
router.put("/locations/:locationId", (req, res) => {
    // Validate Request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Location name can not be empty"
    });
  }

  // Find Location and update it with the request body
  Location.findByIdAndUpdate(
    req.params.locationId,
    {
      name: req.body.name

    },
    { new: true }
  )
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message: "Location not found with id " + req.params.locationId
        });
      }
      res.status(200).send(location);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Location not found with id " + req.params.locationId
        });
      }
      return res.status(500).send({
        message: "Error updating Location with id " + req.params.locationId
      });
    });
})

// DELETE location
router.delete("/locations/:locationId", (req, res) => {
    Location.findByIdAndRemove(req.params.locationId)
    .then(() => {
      return res.json({
        message: "Deleted successfully"
      });
    })
    .catch(err => {
      // next(err)
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: `Location with id  ${req.params.locationId} not found`
        });
      }
      return res.status(500).send({
        message: `Could not delete location with id  ${req.params.locationId}`
      });
    });
})

// POST sub location
router.post("/locations/:locationId/subs", (req, res) => {
    if (!req.body.name || !req.body.females || !req.body.males) {
    return res.status(400).send({
      message: " Location name/females/males field can not be empty"
    });
  }
  let location = new Location(req.body);

      Location.findById(req.params.locationId)
        // .exec()
        .then(sublocation => {
          if (!sublocation) {
            return res.status(404).send({
              message: `Location with id  ${req.params.locationId} not found`
            });
          }
          sublocation.subLocations.push(location)
          sublocation.save()
          .then(sub => {
              res.status(201).send(sub)
          })
        })
  

    .catch(err => {
      if (err.code === 11000) {
        return res.status(400).send({
          message: "This location name already exists."
        });
      }
      return res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Location."
      });
    });
})



module.exports = router;
