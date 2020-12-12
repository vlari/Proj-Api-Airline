const { response } = require('express');
const responseService = require('../../../services/responseService');
const flightDataService = require('./flightDataService');
const { sendJsonResponse, sendErrorResponse } = responseService;

exports.getFlights = async (req, res, next) => {
  try {
    const {
      roundTrip,
      departureDate,
      departureAirportId,
      destinationAirportId,
    } = req.query;
    const reponse = {};

    console.log('response: ', response);
    const departureFlights = await flightDataService.getAll({
      flightDate: departureDate,
      departureAirportId,
      destinationAirportId,
    });

    response.data = {
      departureFlights: {
        ...departureFlights.rows,
        total: departureFlights.count,
      },
    };

    if (roundTrip) {
      const { returnDate = '' } = req.query;

      if (!returnDate) {
        return next(
          sendErrorResponse(400, 'A date of return must be provided.')
        );
      }

      const returnFlights = await flightDataService.getAll(
        {
          flightDate: returnDate,
          departureAirportId: destinationAirportId,
          destinationAirportId: departureAirportId,
        },
        true
      );

      let returnFlightSection = {
        returnFlights: { ...returnFlights.rows, total: returnFlights.count },
      };
      response.data = { ...response.data, ...returnFlightSection };
    }

    sendJsonResponse(200, response, res);
  } catch (error) {
    next(error);
  }
};
