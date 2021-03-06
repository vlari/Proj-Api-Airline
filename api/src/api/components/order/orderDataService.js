const Order = require('./models/order');

exports.getAccountOrders = async (id) => {
  try {
    const flights = await Order.findAll({
      where: {
        id,
      },
    });

    return flights;
  } catch (error) {
    return error;
  }
};

exports.getOrderFlights = async (registeredOrder) => {
  try {
    const flights = await registeredOrder.getFlights();

    return flights;
  } catch (error) {
    return error;
  }
};

exports.addOrder = async (order) => {
  try {
    const registeredOrder = await Order.create(order);

    return registeredOrder;
  } catch (error) {
    return error;
  }
};

exports.addFlights = async (registeredOrder, orderFlights) => {
  try {
    const order = await registeredOrder.addFlights(orderFlights);

    return order;
  } catch (error) {
    return error;
  }
};

exports.addTravelers = async (registeredOrder, travelers) => {
  try {
    const order = await registeredOrder.addTravelers(travelers);

    return order;
  } catch (error) {
    return error;
  }
};
