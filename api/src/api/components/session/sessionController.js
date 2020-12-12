const chalk = require('chalk');
const responseService = require('../../../services/responseService');
const sessionDataService = require('./sessionDataService');
const authService = require('../../../services/authService');
const mailService = require('../../../services/mail/mailService');
const env = require('../../../config/env');

const { sendJsonResponse, sendCookie, sendErrorResponse } = responseService;

exports.signUp = async (req, res, next) => {
  try {
    const email = req.body.email;
    const registeredAccount = await sessionDataService.getByEmail(email);

    if (registeredAccount) {
      return next(sendErrorResponse(400, 'Account already registered'));
    }

    const account = req.body;
    const registeredTraveler = await sessionDataService.addAccount(account);

    const emailOptions = {
      type: 'newAccount',
      email,
    };

    const emailSettings = mailService.getEmailSettings(emailOptions);
    const transporter = mailService.getTransporter();

    transporter.verify((error, success) => {
      if (error) {
        return next(sendErrorResponse(500, `SMTP connection error. ${error}`));
      } else {
        console.log(chalk.green.inverse('SMTP connection ready'));
      }
    });

    transporter.sendMail(emailSettings, (error, info) => {
      if (error) {
        return next(sendErrorResponse(500));
      } else {
        sendJsonResponse(
          201,
          { message: 'Account created', account: registeredTraveler },
          res
        );
      }
    });
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const email = req.body.email;
    const registeredAccount = await sessionDataService.getByEmail(email);

    if (!registeredAccount) {
      return next(sendErrorResponse(404, 'Invalid user account'));
    }

    const password = req.body.password;
    const registeredPassword = registeredAccount.dataValues.password;
    const isValidPassword = await authService.isValidPassword(
      password,
      registeredPassword
    );

    if (!isValidPassword) {
      return next(sendErrorResponse(401, 'Invalid user account'));
    }

    const accountId = registeredAccount.dataValues.id;
    const token = authService.getSignedToken({ id: accountId }, env.SECRET_KEY);

    sendCookie(200, token, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const registeredAccount = await sessionDataService.getByEmail(email);

    if (!registeredAccount) {
      return next(sendErrorResponse(401, 'Invalid user account'));
    }

    const { id, password, createdAt } = account.dataValues;

    const secretKey = authService.getHashedKey({ password, createdAt });
    const token = authService.getSignedToken({ id, email }, secretKey);

    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/route/${id}/${token}`;

    const emailOptions = {
      type: 'forgotPassword',
      email,
      resetUrl,
    };

    const emailSettings = mailService.getEmailSettings(emailOptions);
    const transporter = mailService.getTransporter();

    transporter.verify((error, success) => {
      if (error) {
        return next(sendErrorResponse(500, `SMTP connection error. ${error}`));
      } else {
        console.log(chalk.green.inverse('SMTP connection ready'));
      }
    });

    transporter.sendMail(emailSettings, (error, info) => {
      if (error) {
        return next(sendErrorResponse(500));
      } else {
        sendJsonResponse(
          200,
          { message: 'Email sent', data: info.response },
          res
        );
      }
    });
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { id, token, requestedPassword } = req.body;
    const registeredAccount = await sessionDataService.getById(id);

    if (!registeredAccount) {
      return next(sendErrorResponse(401, 'Account already registered'));
    }

    const { password, createdAt } = registeredAccount;

    const secretKey = authService.getHashedKey({ password, createdAt });
    const userToken = authService.getDecodedToken(token, secretKey);

    if (userToken.id === id) {
      registeredAccount.password = await authService.getHashedPassword(
        requestedPassword
      );

      const account = await sessionDataService.saveAccountDetails(
        registeredAccount
      );
      sendJsonResponse(200, { message: 'Password updated' }, res);
    } else {
      next(sendErrorResponse(500, error));
    }
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};
