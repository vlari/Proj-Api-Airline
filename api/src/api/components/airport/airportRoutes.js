const express = require('express');
const airportController = require('./airportController');

const router = express.Router();

// Add req validator middleware
router
  .route('/airports')
  .get(
    airportController.getAirports,
    airportController.getAirportByCode,
    airportController.getAirportByName
  )
  .post(airportController.addAirport);

module.exports = router;
