const responseService = require('../../../services/responseService');
const airportDataService = require('./airportDataService');
const { sendJsonResponse, sendErrorResponse } = responseService;

exports.getAirports = async (req, res, next) => {
  try {
    const airports = airportDataService.getAll();

    sendJsonResponse(200, { data: airports, count: airports.length }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.getAirportByCode = async (req, res, next) => {
  try {
    const code = req.query.code;
    const airports = airportDataService.getByCode(code);

    if (!airports) {
      sendJsonResponse(404, { data: [] });
    }

    sendJsonResponse(200, { data: airports, count: airports.length }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.getAirportByName = async (req, res, next) => {
  try {
    const name = req.query.name;
    const airports = airportDataService.getByName(name);

    if (!airports) {
      sendJsonResponse(404, { data: [] });
    }

    sendJsonResponse(200, { data: airports, count: airports.length }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.addAirport = async (req, res, next) => {
  try {
    const airport = req.body;

    const registeredAirport = airportDataService.add(airport);

    sendJsonResponse(201, { data: registeredAirport }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};
