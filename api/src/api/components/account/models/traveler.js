const sequelize = require('../../../config/db/db');
const { DataTypes } = require('sequelize');
const DocumentType = require('./documentType');
const EmergencyContact = require('.//emergencyContact');

const Traveler = sequelize.define('Traveler', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  travelerCode: {
    type: DataTypes.STRING,
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
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

DocumentType.hasMany(Traveler);
Traveler.belongsTo(DocumentType);

EmergencyContact.hasOne(Traveler);
Traveler.belongsTo(EmergencyContact);

module.exports = Traveler;
