const Traveler = require('../account/models/traveler');
const authService = require('../../../services/authService');

exports.getByEmail = async (email) => {
  try {
    const account = await Traveler.findOne({
      where: {
        email,
      },
    });

    return account;
  } catch (error) {
    return error;
  }
};

exports.getById = async (id) => {
  try {
    const account = await Traveler.findOne({
      where: {
        id,
      },
    });

    return account;
  } catch (error) {
    return error;
  }
};

exports.addAccount = async (account) => {
  try {
    const registeredAccounts = await Traveler.Count();
    const hashedPassword = authService.getHashedPassword(account.password);

    account.password = hashedPassword;
    account.travelerCode = `T${registeredAccounts + 1}`;
    account.available = true;

    const registeredAccount = await Traveler.create(account);

    return registeredAccount;
  } catch (error) {
    return error;
  }
};

exports.saveAccountDetails = async (account) => {
  try {
    const registeredAccount = await account.save();
    return registeredAccount;
  } catch (error) {
    return error;
  }
};
