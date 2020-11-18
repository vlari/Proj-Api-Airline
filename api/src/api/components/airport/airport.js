const sequelize = require('../../../config/db/db');
const { DataTypes } = require('sequelize');
const City = require('../location/models/city');

const Airport = sequelize.define('Airport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

City.hasMany(Airport);
Airport.belongsTo(City);

module.exports = Airport;
