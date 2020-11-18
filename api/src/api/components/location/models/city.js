const sequelize = require('../../../../config/db/db');
const { DataTypes } = require('sequelize');
const Country = require('./country');

const City = sequelize.define('City', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Country.hasMany(City);
City.belongsTo(Country);

module.exports = City;
