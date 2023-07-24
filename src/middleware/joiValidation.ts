import { NextFunction, Request, Response } from "express";
import {
  ecosystemAccessRequestInvitationSchema,
  ecosystemAccessRequestSchema,
  ecosystemCreationSchema,
  ecosystemUpdateSchema,
} from "../libs/joi/ecosystemSchemas";
import {
  participantCreationSchema,
  participantUpdateSchema,
} from "../libs/joi/participantSchemas";
import { NotFoundError } from "../errors/NotFoundError";
import { ValidationError } from "joi";
import {
  dataOfferingCreationSchema,
  dataOfferingUpdateSchema,
} from "../libs/joi/dataOfferingSchemas";
import {
  serviceOfferingCreationSchema,
  serviceOfferingUpdateSchema,
} from "../libs/joi/serviceOfferingSchemas";

/**
 * Sets the Joi schema to use as validation
 * against the incoming request payload
 */
export const setJoiValidationSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { method, originalUrl, body } = req;
    let schema;
    if (originalUrl.includes("ecosystems")) {
      schema =
        method === "POST" ? ecosystemCreationSchema : ecosystemUpdateSchema;
    } else if (originalUrl.includes("participants")) {
      schema =
        method === "POST" ? participantCreationSchema : participantUpdateSchema;
    } else if (originalUrl.includes("data")) {
      schema =
        method === "POST"
          ? dataOfferingCreationSchema
          : dataOfferingUpdateSchema;
    } else if (originalUrl.includes("services")) {
      schema =
        method === "POST"
          ? serviceOfferingCreationSchema
          : serviceOfferingUpdateSchema;
    } else if (originalUrl.includes("access-request")) {
      if (method === "POST") {
        if (body.ecosystem && body.participant) {
          req.validationSchema = ecosystemAccessRequestInvitationSchema;
        } else if (body.ecosystem && body.role && !body.participant) {
          req.validationSchema = ecosystemAccessRequestSchema;
        }
      }
    } else {
      throw new NotFoundError("Unknown path validation key");
    }

    req.validationSchema = schema;
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Validates the payload against the set joi schema
 * Must be used after setJoiValidationSchema middleware
 */
export const validatePayload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationSchema = req.validationSchema;
    const { error, value: validatedPayload } = validationSchema.validate(
      req.body,
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    req.body = validatedPayload;
    next();
  } catch (err) {
    if (err instanceof ValidationError)
      return res.status(400).json({ error: err.details });
    next(err);
  }
};
