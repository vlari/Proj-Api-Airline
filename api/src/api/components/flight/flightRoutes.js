const express = require('express');
const flightController = require('./flightController');
const flightValidator = require('../../middleware/requestValidators/flightValidator');

const router = express.Router();

router
  .route('/flights')
  .get(
    flightValidator.validateFlight,
    flightController.getFlights
  );

module.exports = router;
