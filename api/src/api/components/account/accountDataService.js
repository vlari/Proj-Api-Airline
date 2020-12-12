const Account = require('./models/traveler');
const DocumentType = require('./models/documentType');
const EmergencyContact = require('./models/emergencyContact');
const Address = require('./models/address');

exports.getAccount = async (id) => {
  try {
    const account = await Account.findByPk(id, {
      attributes: {
        exclude: ['password', 'available'],
      },
      include: [
        {
          model: DocumentType,
          attributes: ['id', 'name'],
        },
      ],
    });

    return account;
  } catch (error) {
    return error;
  }
};

exports.getByPk = async (id, query = {}) => {
  try {
    const account = await Account.findByPk(id, query);
    return account;
  } catch (error) {
    return error;
  }
};

exports.getDocumentTypes = async () => {
  try {
    const documentTypes = await DocumentType.findAll({
      order: [['name']],
    });

    return documentTypes;
  } catch (error) {
    return error;
  }
};

exports.getAddresses = async (id) => {
  try {
    const addresses = await Address.findAll({
      order: [['address']],
      where: {
        TravelerId: id,
      },
    });

    return addresses;
  } catch (error) {
    return error;
  }
};

exports.updateAccount = async (id, accountDetails) => {
  try {
    const account = await Account.findByPk(id);

    const updatedAccount = await account.update(accountDetails);

    return updatedAccount;
  } catch (error) {
    return error;
  }
};

exports.updatePassword = async (password) => {
  try {
    const account = await findByPk(id);

    const updatedAccount = await account.update({ password });

    return updatedAccount;
  } catch (error) {
    return error;
  }
};
