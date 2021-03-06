const sequelize = require('../../../../config/db/db');
const { DataTypes } = require('sequelize');
const Traveler = require('./traveler');

const Address = sequelize.define('Address', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Traveler.hasMany(Address);
Address.belongsTo(Traveler);

module.exports = Address;
