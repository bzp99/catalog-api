// Authentication will be reworked when integrating Verifiable Credentials
// For now a simple JWT is used to simulate

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyJwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or invalid" });
  }

  const token = authHeader.slice(7);

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    ) as JwtPayload;

    req.decodedToken = decodedToken;
    req.participant = {
      id: decodedToken.sub,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
