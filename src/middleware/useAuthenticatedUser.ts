import { NextFunction, Request, Response } from "express";
import { Participant } from "../models/Participant";
import { NotFoundError } from "../errors/NotFoundError";

/**
 * Populates the user (Participant) for following
 * handlers to avoid controllers to populate for the
 * participant
 */
export const usePopulatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const participant = await Participant.findById(req.user?.id);
    if (!participant) throw new NotFoundError("Participant not found");
    req.user.populated = participant;
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
