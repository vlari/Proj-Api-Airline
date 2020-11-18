const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/db/db');
const Seat = require('./seat');
const Flight = require('./flight');

const FlightSeat = sequelize.define('FlightSeat', {
  FlightId: {
    type: DataTypes.INTEGER,
    references: {
      model: Flight,
      key: 'id',
    },
  },
  SeatId: {
    type: DataTypes.INTEGER,
    references: {
      model: Seat,
      key: 'id',
    },
  },
});

Flight.belongsToMany(Seat, { through: FlightSeat });
Seat.belongsToMany(Flight, { through: FlightSeat });

module.exports = FlightSeat;
