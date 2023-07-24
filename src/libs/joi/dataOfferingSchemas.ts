import Joi from "joi";

export const dataOfferingCreationSchema = Joi.object({
  title: Joi.string().required(),
  dataType: Joi.string().default(""),
  dataSize: Joi.string().required().default(""),
  description: Joi.string().required(),
  identifier: Joi.string().required(),
  license: Joi.string().default(""),
  publisher: Joi.string().required(),
  hasPolicy: Joi.array().items(Joi.string()).default(""),
  offeredBy: Joi.array().items(Joi.string()).required(),
  accrualPeriodicity: Joi.string().default(""),
  businessModel: Joi.string().default(""),
}).default();

export const dataOfferingUpdateSchema = Joi.object({
  title: Joi.string(),
  dataType: Joi.string(),
  dataSize: Joi.string(),
  description: Joi.string(),
  identifier: Joi.string(),
  license: Joi.string(),
  publisher: Joi.string(),
  hasPolicy: Joi.array().items(Joi.string()),
  offeredBy: Joi.array().items(Joi.string()),
  accrualPeriodicity: Joi.string(),
  businessModel: Joi.string(),
});
