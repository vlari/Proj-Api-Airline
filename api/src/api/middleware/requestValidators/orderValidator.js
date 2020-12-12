const Joi = require('joi');
const responseService = require('../../../services/responseService');

exports.validateOrderSubmit = (req, res, next) => {
  const schema = Joi.object({
    flights: Joi.array()
      .items({
        flightNumber: Joi.string().required(),
      })
      .required(),
    travelers: Joi.array()
      .items({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        middlename: Joi.string(),
        suffix: Joi.string().required(),
        documentNumber: Joi.string().required(),
        gender: Joi.string().required(),
        dateOfBirth: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        DocumentId: Joi.number().required(),
        SeatId: Joi.number().required(),
      })
      .required(),
    PaymentOptionId: Joi.number().required(),
    subtotal: Joi.number().required(),
    tax: Joi.number().required(),
    total: Joi.number().required(),
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
