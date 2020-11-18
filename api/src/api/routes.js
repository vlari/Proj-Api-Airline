const express = require('express');

const sessionRoutes = require('./components/session/sessionRoutes');
const locationRoutes = require('./components/location/locationRoutes');
const airportRoutes = require('./components/airport/airportRoutes');

const router = express.Router();

router.use('/api', sessionRoutes);
router.use('/api', locationRoutes);
router.use('/api', airportRoutes);

module.exports = router;
