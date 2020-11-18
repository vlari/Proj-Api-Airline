const Region = require('./models/region');
const Country = require('./models/country');
const City = require('./models/city');

exports.getRegions = async () => {
  try {
    const regions = await Region.findAll({
      order: [['name']],
    });

    return regions;
  } catch (error) {
    return error;
  }
};

exports.getCountries = async () => {
  try {
    const countries = await Country.findAll({
      order: [['name']],
    });

    return countries;
  } catch (error) {
    return error;
  }
};

exports.getCities = async () => {
  try {
    const cities = await City.findAll({
      order: [['name']],
    });

    return cities;
  } catch (error) {
    return error;
  }
};
