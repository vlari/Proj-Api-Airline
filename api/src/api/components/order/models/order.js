const sequelize = require('../../../../config/db/db');
const { DataTypes } = require('sequelize');
const PaymentOption = require('./paymentOption');
const Account = require('../../account/models/account');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  tax: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

PaymentOption.hasMany(Order);
Order.belongsTo(PaymentOption);

Account.hasOne(Order);
Order.belongsTo(Account);

module.exports = Order;
