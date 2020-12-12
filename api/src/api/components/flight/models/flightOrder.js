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

module.exports = FlightOrder;
