const sequelize = require('../../../../config/db/db');
const { DataTypes } = require('sequelize');

const PaymentOption = sequelize.define('PaymentOption', {
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
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = PaymentOption;
