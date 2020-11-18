const sequelize = require('../../../config/db/db');
const { DataTypes } = require('sequelize');

const CardType = sequelize.define('CardType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CardType;
