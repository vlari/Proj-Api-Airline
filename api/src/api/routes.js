const express = require('express');

const sessionRoutes = require('./components/session/sessionRoutes');
const locationRoutes = require('./components/location/locationRoutes');
const airportRoutes = require('./components/airport/airportRoutes');
const accountRoutes = require('./components/account/accountRoutes');
const flightRoutes = require('./components/flight/flightRoutes');
const orderRoutes = require('./components/order/orderRoutes');


const router = express.Router();

router.use('/api', sessionRoutes);
router.use('/api', accountRoutes);
router.use('/api/locations', locationRoutes);
router.use('/api', airportRoutes);
router.use('/api', flightRoutes);
router.use('/api', orderRoutes);

module.exports = router;
