const responseService = require('../../../services/responseService');
const accountDataService = require('./accountDataService');
const authService = require('../../../services/authService');
const { sendJsonResponse, sendErrorResponse } = responseService;

exports.getAccountDetails = async (req, res, next) => {
  try {
    const id = req.user.dataValues.id;

    const accountDetails = await accountDataService.getAccount(id);

    sendJsonResponse(200, { data: accountDetails }, res);
  } catch (error) {
    next(sendErrorResponse(500));
  }
};

exports.updateAccount = async (req, res, next) => {
  try {
    const id = req.user.dataValues.id;
    const accountDetail = req.body;

    const updatedAccount = await accountDataService.updateAccount(id, accountDetail);

    sendJsonResponse(200, { data: updatedAccount }, res);
  } catch (error) {
    next(sendErrorResponse(500));
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const id = req.user.dataValues.id;
    const { password, requestedPassword } = req.body;

    const account = await accountDataService.getByPk(id);

    const isValidPassword = await authService.isValidPassword(
      password,
      account.password
    );

    if (!isValidPassword) {
      next(sendErrorResponse(401, 'Invalid user account'));
    }

    const hashedPassword = await authService.getHashedPassword(
      requestedPassword
    );

    const updatedAccount = await accountDataService.updatePassword(
      hashedPassword
    );

    sendJsonResponse(200, { data: updatedAccount }, res);
  } catch (error) {
    next(sendErrorResponse(500));
  }
};

exports.getDocumentTypes = async (req, res, next) => {
  try {
    const documentTypes = await accountDataService.getDocumentTypes();

    sendJsonResponse(
      200,
      { data: documentTypes, count: documentTypes.length },
      res
    );
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.getAccountAddresses = async (req, res, next) => {
  try {
    const id = req.user.dataValues.id;
    const addresses = await accountDataService.getAddresses(id);

    sendJsonResponse(200, { data: addresses, count: addresses.length }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};
