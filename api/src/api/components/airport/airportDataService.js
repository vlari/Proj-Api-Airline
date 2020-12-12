const Airport = require('./airport');

exports.getAll = async (queryParams) => {
  try {
    let query = '';

    if (queryParams) {
      query = {
        where: queryParams,
      };
    }

    const airports = await Airport.findAll({
      order: [['code']],
      ...query,
    });

    return airports;
  } catch (error) {
    return error;
  }
};

exports.getByCode = async (code) => {
  try {
    const airports = await Airport.findAll({
      where: {
        code,
      },
      order: [['code']],
    });

    console.log('airports', airports);

    return airports[0];
  } catch (error) {
    return error;
  }
};

exports.getByName = async (name) => {
  try {
    const airports = await Airport.findAll({
      where: {
        name,
      },
      order: [['code']],
    });

    return airports;
  } catch (error) {
    return error;
  }
};

exports.add = async (airport) => {
  try {
    const registeredAirport = await Airport.create(airport);

    return registeredAirport;
  } catch (error) {
    return error;
  }
};
