import Joi from "joi";

export const participantCreationSchema = Joi.object({
  hasLegallyBindingName: Joi.string().required(),
  identifier: Joi.string().required(),
  address: Joi.object({
    addressLocality: Joi.string().default(""),
    addressRegion: Joi.string().default(""),
    postalCode: Joi.string().default(""),
    streetAddress: Joi.string().default(""),
  }),
  url: Joi.string(),
  description: Joi.string().required(),
  hasBusinessIdentifier: Joi.string().default(""),
  hasMemberParticipant: Joi.array().items(Joi.string()).default([]),
  hasLogo: Joi.string().default(""),
  contactPoint: Joi.array().items(
    Joi.object({
      email: Joi.string().required(),
      telephone: Joi.string().required(),
      contactType: Joi.string().required(),
    })
  ),
  hasCompanyType: Joi.string().default(""),
  hasPhoneNumber: Joi.string().required(),
  hasMemberPerson: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
    })
  ),
  email: Joi.string().required(),
  password: Joi.string().required(),
  jsonld: Joi.string().default(""),
}).default();

export const participantUpdateSchema = Joi.object({
  hasLegallyBindingName: Joi.string(),
  identifier: Joi.string(),
  address: Joi.object({
    addressLocality: Joi.string(),
    addressRegion: Joi.string(),
    postalCode: Joi.string(),
    streetAddress: Joi.string(),
  }),
  url: Joi.string(),
  description: Joi.string(),
  hasBusinessIdentifier: Joi.string(),
  hasMemberParticipant: Joi.array().items(Joi.string()),
  hasLogo: Joi.string(),
  contactPoint: Joi.array().items(
    Joi.object({
      email: Joi.string().required(),
      telephone: Joi.string().required(),
      contactType: Joi.string().required(),
    })
  ),
  hasCompanyType: Joi.string(),
  hasPhoneNumber: Joi.string(),
  hasMemberPerson: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
    })
  ),
  email: Joi.string(),
  password: Joi.string(),
  jsonld: Joi.string(),
});
