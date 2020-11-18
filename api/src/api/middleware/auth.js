const jwt = require('jsonwebtoken');
const Traveler = require('../components/account/models/traveler');
const responseService = require('../../services/responseService');
const env = require('../../config/env');
const { response } = require('express');

exports.guard = async (req, res, next) => {
  let userToken = '';

  if (req.cookies.userToken) {
    userToken = req.cookies.userToken;
  }

  if (!userToken) {
    return next(responseService.sendErrorResponse(401));
  }

  try {
    const token = jwt.verify(userToken, env.SECRET_KEY);

    const account = await Traveler.findByPk(token.id);

    if (!user) {
      return next(responseService.sendErrorResponse(401));
    } else {
      req.user = use;
      next();
    }
  } catch (error) {
    next(responseService.sendErrorResponse(401));
  }
};
