const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/db/db');
const Order = require('../../order/models/order');
const Flight = require('./flight');

const FlightOrder = sequelize.define('FlightOrder', {
  FlightId: {
    type: DataTypes.INTEGER,
    references: {
      model: Flight,
      key: 'id',
    },
  },
  OrderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
  },
});

Flight.belongsToMany(Order, { through: FlightOrder });
Order.belongsToMany(Flight, { through: FlightOrder });

module.exports = FlightOrder;
