import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/BadRequestError";
import { BadEndpointError } from "../errors/BadEndpointError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { CONFIG } from "../config/environment";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof BadRequestError ||
    err instanceof BadEndpointError ||
    err instanceof ForbiddenError ||
    err instanceof NotFoundError
  ) {
    const jsonRes = err.jsonResponse();
    return res.status(jsonRes.code).json(err.jsonResponse());
  } else {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Something went wrong",
      devMsg: CONFIG.env === "development" ? err.message : undefined,
      devStack: CONFIG.env === "development" ? err.stack : undefined,
    });
  }

  next(err);
};
