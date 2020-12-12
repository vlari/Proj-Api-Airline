const sequelize = require('../../../../config/db/db');
const { DataTypes } = require('sequelize');
const Airport = require('../../airport/airport');
const FlightOrder = require('./flightOrder');
const Order = require('../../order/models/order');

const Flight = sequelize.define('Flight', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  flightNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  totalMiles: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

Airport.hasMany(Flight, {
  foreignKey: {
    name: 'departureAirportId',
    allowNull: false
  },
});

Airport.hasMany(Flight, {
  foreignKey: {
    name: 'destinationAirportId',
    allowNull: false
  }
});

Flight.belongsToMany(Order, { through: FlightOrder });
Order.belongsToMany(Flight, { through: FlightOrder });

module.exports = Flight;
