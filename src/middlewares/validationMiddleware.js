const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addUserValidation: (req, res, next) => {
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      console.log(validationResult.error);
      next(new ValidationError(validationResult.error.details[0].message));
    }
    next();
  },
  transactionsValidation: (req, res, next) => {
    const schema = Joi.object({
      typeTransaction: Joi.boolean().required(),
      sum: Joi.number().required(),
      owner: Joi.string().required(),
      description: Joi.string(),
      category: Joi.string(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }
    next();
  },
  transferValidation: (req, res, next) => {
    const schema = Joi.object({
      sum: Joi.number().required(),
      owner: Joi.string().required(),
      recipient: Joi.string().required(),
      description: Joi.string(),
      category: Joi.string(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }
    next();
  },
};
