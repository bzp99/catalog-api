import { NextFunction, Request, Response } from "express";

/**
 * The list of Parameter names that are used in routers
 * that the passthrough is aware of and should process
 */
const KNOWN_PARAM_NAMES = ["id"];

/**
 * This middleware enables a request made to /me that
 * should require authentication to not be blocked by
 * the /:id request when it exists for the resource in
 * the public router.
 */
export const passthroughMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundKey = Object.keys(req.params).find((param) =>
      KNOWN_PARAM_NAMES.includes(param)
    );

    if (!foundKey) return next();
    if (foundKey && req.params[foundKey] === "me") return next("route");
    else return next();
  } catch (err) {
    next(err);
  }
};
