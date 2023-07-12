import { NextFunction, Request, Response } from "express";
import { issueJwt } from "../libs/jwt/jwt";
import Participant from "../models/Participant/Participant.model";

import { Router } from "express";
const r: Router = Router();

/**
 * Logs the participant in and generates a JWT
 * for authentication in following requests
 */
r.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const participant = await Participant.findOne({ email });

    if (!participant || !participant.validatePassword(password)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = issueJwt(participant);
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

export default r;
