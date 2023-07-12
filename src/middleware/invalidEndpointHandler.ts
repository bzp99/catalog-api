import { NextFunction, Request, Response } from "express";
import { BadEndpointError } from "../errors/BadEndpointError";

export const invalidEndpointHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new BadEndpointError(req));
};
