const responseService = require('../../../services/responseService');
const { sendJsonResponse, sendErrorResponse } = responseService;
const locationDataService = require('./locationDataService');

exports.getRegions = async (req, res, next) => {
  try {
    const regions = await locationDataService.getRegions();

    sendJsonResponse(200, { data: regions, count: regions.length }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.getCountries = async (req, res, next) => {
  try {
    const countries = await locationDataService.getCountries();

    sendJsonResponse(200, { data: countries, count: countries.length }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.getCities = async (req, res, next) => {
  try {
    const cities = await locationDataService.getCities();

    sendJsonResponse(200, { data: cities, count: cities.length }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};
