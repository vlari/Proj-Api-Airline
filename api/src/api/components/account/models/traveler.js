const sequelize = require('../../../../config/db/db');
const { DataTypes } = require('sequelize');
const DocumentType = require('./documentType');
const Seat = require('../../flight/models/seat');
const EmergencyContact = require('.//emergencyContact');

const Traveler = sequelize.define('Traveler', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  suffix: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  documentNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

DocumentType.hasMany(Traveler);
Traveler.belongsTo(DocumentType);

Seat.hasMany(Traveler);
Traveler.belongsTo(Seat);

EmergencyContact.hasOne(Traveler, { onDelete: 'CASCADE' });
Traveler.belongsTo(EmergencyContact);

module.exports = Traveler;
