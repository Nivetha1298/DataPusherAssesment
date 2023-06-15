const Joi = require('joi');
 export const destinationSchema = Joi.object({
    url: Joi.string().required(),
    httpMethod: Joi.string().required(),
    headers: Joi.object().pattern(Joi.string(), Joi.string()).required(),
  }); 