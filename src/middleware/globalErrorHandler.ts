import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/BadRequestError";
import { BadEndpointError } from "../errors/BadEndpointError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";

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
      devMsg: process.env.NODE_ENV === "development" ? err.message : undefined,
      devStack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  next(err);
};
