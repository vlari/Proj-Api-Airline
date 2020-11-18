const express = require('express');
const locationController = require('./locationController');

const router = express.Router();

const { getRegions, getCountries, getCities } = locationController;

router.route('/regions').post(getRegions);
router.route('/countries').post(getCountries);
router.route('/cities').post(getCities);

module.exports = router;
