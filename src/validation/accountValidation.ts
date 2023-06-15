const Joi = require('joi');

 export const accountSchema = Joi.object({
  email: Joi.string().email().required(),
  accountName: Joi.string().required(),
  website: Joi.string().optional(),
});


