const responseService = require('../../../services/responseService');
const airportDataService = require('./airportDataService');
const { sendJsonResponse, sendErrorResponse } = responseService;

exports.getAirports = async (req, res, next) => {
  try {
    let query = {};

    for (let key in req.query) {
      if (req.query.hasOwnProperty(key)) {
        query[key] = req.query[key];
      }
    }

    const airports = await airportDataService.getAll(query);

    sendJsonResponse(200, { data: airports, count: airports.length }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.getAirportByCode = async (req, res, next) => {
  try {
    const code = req.query.code;
    const airport = await airportDataService.getByCode(code);

    if (!airport) {
      sendJsonResponse(404, { data: [] });
    }

    sendJsonResponse(200, { data: airport }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.getAirportByName = async (req, res, next) => {
  try {
    const name = req.query.name;
    const airport = await airportDataService.getByName(name);

    if (!airport) {
      sendJsonResponse(404, { data: [] });
    }

    sendJsonResponse(200, { data: airport }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.addAirport = async (req, res, next) => {
  try {
    const airport = req.body;

    const registeredAirport = await airportDataService.add(airport);

    sendJsonResponse(201, { data: registeredAirport }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};
