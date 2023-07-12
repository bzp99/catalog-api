import "express";
import { JwtPayload } from "jsonwebtoken";
import { IEcosystem } from "./models";

import Joi from "joi";

declare module "express" {
  interface Request {
    decodedToken?: JwtPayload;
    participant?: {
      id: string;
    };

    /**
     * Available after a successful ownership
     * verification on a PUT request
     */
    ecosystem?: IEcosystem;

    validationSchema?: Joi.ObjectSchema;
  }
}
