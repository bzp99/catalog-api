import Joi from "joi";

export const serviceOfferingCreationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  landingPage: Joi.string().default(""),
  keyword: Joi.array().items(Joi.string()),
  distribution: Joi.array().items(Joi.string()),
  accrualPeriodicity: Joi.string(),
  subject: Joi.string(),
  spatial: Joi.string(),
  theme: Joi.string(),
  temporalResolution: Joi.string(),
  businessModel: Joi.string(),
  offeredBy: Joi.array().items(Joi.string()).required(),
}).options({ abortEarly: false });

export const serviceOfferingUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  landingPage: Joi.string(),
  keyword: Joi.array().items(Joi.string()),
  distribution: Joi.array().items(Joi.string()),
  accrualPeriodicity: Joi.string(),
  subject: Joi.string(),
  spatial: Joi.string(),
  theme: Joi.string(),
  temporalResolution: Joi.string(),
  businessModel: Joi.string(),
  offeredBy: Joi.array().items(Joi.string()),
}).options({ abortEarly: false });
