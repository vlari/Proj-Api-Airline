const jwt = require('jsonwebtoken');
const Traveler = require('../components/account/models/traveler');
const responseService = require('../../services/responseService');
const env = require('../../config/env');

exports.guard = async (req, res, next) => {
  let userToken = '';

  if (req.path === '/orders' && req.method === 'POST') {
    next();
  }

  if (req.cookies.userToken) {
    userToken = req.cookies.userToken;
  }

  if (!userToken) {
    return next(responseService.sendErrorResponse(401));
  }

  try {
    const token = jwt.verify(userToken, env.SECRET_KEY);

    const account = await Traveler.findByPk(token.id);

    if (!account) {
      return next(responseService.sendErrorResponse(401));
    } else {
      req.user = account;
      next();
    }
  } catch (error) {
    next(responseService.sendErrorResponse(401));
  }
};
