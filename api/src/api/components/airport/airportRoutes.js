const express = require('express');
const airportController = require('./airportController');

const router = express.Router();

router
  .route('/airports')
  .get(
    airportController.getAirports
  )
  .post(airportController.addAirport);

module.exports = router;
