const Joi = require('joi');
const responseService = require('../../../services/responseService');

exports.validateFlight = (req, res, next) => {
  const schema = Joi.object({
    roundTrip: Joi.boolean().required(),
    departureDate: Joi.string().required(),
    returnDate: Joi.string(),
    departureAirportId: Joi.number().required(),
    destinationAirportId: Joi.number().required(),
  });

  const validationResult = schema.validate(req.query);

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
