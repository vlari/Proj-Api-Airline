const sequelize = require('../../../../config/db/db');
const { DataTypes } = require('sequelize');
const Region = require('./region');

const Country = sequelize.define('Country', {
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

Region.hasMany(Country);
Country.belongsTo(Region);

module.exports = Country;
