const chalk = require('chalk');

const Region = require('../../api/components/location/models/region');
const Country = require('../../api/components/location/modelscountry');
const City = require('../../api/components/location/models/city');
const SeatType = require('../../api/components/flight/models/seatType');
const Seat = require('../../api/components/flight/models/seat');


const regions = require('./data/regions.json');
const countries = require('./data/countries.json');
const cities = require('./data/cities.json');
const seatTypes = require('./data/seatTypes.json');
const seats = require('./data/seats.json');

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


    console.log(chalk.yellow.inverse('Database seed ended'));
  } catch (error) {
    console.log(chalk.red.inverse('Error seeding the database', error));
  }

};

module.exports = seedDatabase;
