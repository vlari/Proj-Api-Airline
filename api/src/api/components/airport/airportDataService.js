const Airport = require('./airport');

exports.getAll = async () => {
  try {
    const airports = await Airport.findAll({
      order: [['code']],
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

    return airports;
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
