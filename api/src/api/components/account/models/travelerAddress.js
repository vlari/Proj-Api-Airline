const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/db/db');
const Traveler = require('./traveler');
const Address = require('./address');

const TravelerAddress = sequelize.define('TravelerAddress', {
  TravelerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Traveler,
      key: 'id',
    },
  },
  AddressId: {
    type: DataTypes.INTEGER,
    references: {
      model: Address,
      key: 'id',
    },
  },
});

Traveler.belongsToMany(Address, { through: TravelerAddress });
Address.belongsToMany(Traveler, { through: TravelerAddress });

module.exports = TravelerAddress;
