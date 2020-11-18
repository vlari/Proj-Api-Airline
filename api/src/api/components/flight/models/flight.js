const sequelize = require('../../../config/db/db');
const { DataTypes } = require('sequelize');
const Airport = require('../../airport/airport');

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
  departDate: {
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
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

Airport.hasMany(Flight);
Flight.belongsTo(Airport);

module.exports = Flight;
