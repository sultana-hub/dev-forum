const Joi = require('joi');

const postValidation = Joi.object({
  text: Joi.string().required().messages({
    'any.required': 'Text is required',
    'string.empty': 'Text cannot be empty'
  })
//   name: Joi.string().required().messages({
//     'any.required': 'Name is required',
//     'string.empty': 'Name cannot be empty'
//   }),
//   avatar: Joi.string().required().messages({
//     'any.required': 'avatar  is required',
//     'string.empty': 'avatar  cannot be empty'
//   }),
//   from: Joi.date().required().messages({
//     'any.required': 'Start date is required',
//     'date.base': 'From must be a valid date'
//   }),
//   to: Joi.date().optional(),
//   current: Joi.boolean().optional(),
//   description: Joi.string().optional()
});

module.exports = postValidation;