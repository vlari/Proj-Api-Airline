const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/db/db');
const Order = require('./order');
const Traveler = require('../../account/models/traveler');

const OrderTraveler = sequelize.define('OrderTraveler', {
  OrderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
  },
  TravelerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Traveler,
      key: 'id',
    },
  },
});

Order.belongsToMany(Traveler, { through: OrderTraveler });
Traveler.belongsToMany(Order, { through: OrderTraveler });

module.exports = OrderTraveler;
