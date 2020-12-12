const chalk = require('chalk');

const Region = require('../../api/components/location/models/region');
const Country = require('../../api/components/location/models/country');
const City = require('../../api/components/location/models/city');
const SeatType = require('../../api/components/flight/models/seatType');
const Seat = require('../../api/components/flight/models/seat');
const Airport = require('../../api/components/airport/airport');
const DocumentType = require('../../api/components/account/models/documentType');
const Flight = require('../../api/components/flight/models/flight');
const PaymentOption = require('../../api/components/order/models/paymentOption');

const regions = require('./data/regions.json');
const countries = require('./data/countries.json');
const cities = require('./data/cities.json');
const seatTypes = require('./data/seatTypes.json');
const seats = require('./data/seats.json');
const airports = require('./data/airports.json');
const documentTypes = require('./data/documentTypes.json');
const flights = require('./data/flights.json');
const paymentOptions = require('./data/paymentOptions.json');

const seedDatabase = async () => {
  try {
    // Insert regions
    await Region.bulkCreate(regions);

    // Insert countries
    await Country.bulkCreate(countries);

    // Insert cities
    await City.bulkCreate(cities);

    // Insert seat types
    await SeatType.bulkCreate(seatTypes);

    // Insert seats
    await Seat.bulkCreate(seats);

    // Insert airports
    await Airport.bulkCreate(airports);

    // Insert document types
    await DocumentType.bulkCreate(documentTypes);

    // Insert payment options
    await PaymentOption.bulkCreate(paymentOptions);

    // Insert flights
    await Flight.bulkCreate(flights);

    // await flights.forEach(async (flight) => {
    //   const registeredFlight = await Flight.create(flight);

    //   const airportCount = await Airport.count();
    //   const departAirportId = getRandomId(1, airportCount);
    //   const destinationAirportId = getRandomId(1, airportCount);

    //   const departAirport = await Airport.findByPk(departAirportId);
    //   const destinationAirport = await Airport.findByPk(destinationAirportId);

    //   await FlightAirport.create({
    //     AirportId: departAirport.dataValues.id,
    //     FlightId: registeredFlight.dataValues.id,
    //   });
    //   await FlightAirport.create({
    //     AirportId: destinationAirport.dataValues.id,
    //     FlightId: registeredFlight.dataValues.id,
    //   });
    // });

    console.log(chalk.yellow.inverse('Database seed ended'));
  } catch (error) {
    console.log(chalk.red.inverse('Error seeding the database', error));
  }
};

module.exports = seedDatabase;
