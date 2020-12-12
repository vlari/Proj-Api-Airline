const express = require('express');
const locationController = require('./locationController');

const router = express.Router();

const { getRegions, getCountries, getCities } = locationController;

router.route('/regions').get(getRegions);
router.route('/countries').get(getCountries);
router.route('/cities').get(getCities);

module.exports = router;
