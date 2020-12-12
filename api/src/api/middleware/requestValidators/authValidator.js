const Joi = require('joi');
const responseService = require('../../../services/responseService');

exports.validateSignUp = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName: Joi.string(),
    suffix: Joi.string(),
    documentNumber: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    gender: Joi.string().required(),
    email: Joi.string()
      .pattern(
        /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/
      )
      .required(),
    phone: Joi.string().required(),
    password: Joi.string().min(8).required(),
    DocumentTypeId: Joi.number().required(),
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

exports.validateSignIn = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .pattern(
        /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/
      )
      .required(),
    password: Joi.string().min(8).required(),
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

exports.validateEmail = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .pattern(
        /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/
      )
      .required(),
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

exports.validatePassword = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    token: Joi.string().required(),
    requestedPassword: Joi.string().required(),
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
