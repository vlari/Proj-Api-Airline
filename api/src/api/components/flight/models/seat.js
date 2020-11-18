const sequelize = require('../../../config/db/db');
const { DataTypes } = require('sequelize');
const SeatType = require('./seatType');

const Seat = sequelize.define('Seat', {
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
});

SeatType.hasMany(Seat);
Seat.belongsTo(SeatType);

module.exports = Seat;
