const Flight = require('./models/flight');
const { Op } = require('sequelize');

exports.getAll = async (
  { flightDate, departureAirportId, destinationAirportId },
  roundTrip = false
) => {
  try {
    let dateQuery = roundTrip
      ? { [Op.gte]: flightDate }
      : { [Op.gte]: flightDate };

    const flights = await Flight.findAndCountAll({
      order: [['flightNumber']],
      where: {
        [Op.and]: [
          { departureDate: { ...dateQuery } },
          { departureAirportId: departureAirportId },
          { destinationAirportId: destinationAirportId },
        ],
      },
    });

    return flights;
  } catch (error) {
    return error;
  }
};

exports.getOrderFlights = async (flightNumbers) => {
  try {
    const flights = await Flight.findAll({
      where: {
        flightNumber: flightNumbers,
      },
    });

    return flights;
  } catch (error) {
    return error;
  }
};