const Joi = require('joi');
const responseService = require('../../../services/responseService');

exports.validatePassword = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(8).required(),
    requestedPassword: Joi.string().min(8).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(
      responseService.sendErrorResponse(
        400,
        validationResult.error.details[0].message
      )
    );
  } else {
    next();
  }
};
