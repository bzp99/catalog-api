import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors/NotFoundError";
import Participant from "../../models/Participant/Participant.model";

/**
 * Updates a participant
 */
export const updateParticipantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedParticipant = await Participant.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedParticipant) throw new NotFoundError("Participant not found");

    res.json(updatedParticipant);
  } catch (err) {
    next(err);
  }
};

/**
 * Deletes a participant
 */
export const deleteParticipantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedParticipant = await Participant.findByIdAndDelete(id);

    if (!deletedParticipant) throw new NotFoundError("Participant not found");

    res.json({ message: "Participant deleted successfully" });
  } catch (err) {
    next(err);
  }
};
