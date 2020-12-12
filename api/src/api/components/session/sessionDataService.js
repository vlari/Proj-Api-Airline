const Account = require('../account/models/account');
const authService = require('../../../services/authService');

exports.getByEmail = async (email) => {
  try {
    const account = await Account.findOne({
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
    const account = await Account.findOne({
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
    const registeredAccounts = await Account.count();
    const hashedPassword = await authService.getHashedPassword(account.password);

    account.password = hashedPassword;
    account.accountCode = `T${registeredAccounts + 1}`;
    account.available = true;

    const registeredAccount = await Account.create(account);

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
