import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors/NotFoundError";
import Participant from "../../models/Participant/Participant.model";
import { PARTICIPANT_SELECTION } from "../../utils/schemaSelection";
import ServiceOffering from "../../models/ServiceOffering/ServiceOffering.model";
import DataOffering from "../../models/DataOffering/DataOffering.model";
import Ecosystem from "../../models/Ecosystem/Ecosystem.model";

/**
 * Returns the information of the logged in user
 * @author Felix Bole
 */
export const getMyParticipant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const participant = await Participant.findById(req.user.id);
    if (!participant) throw new NotFoundError("Participant not found");
    return res.json(participant);
  } catch (err) {
    next(err);
  }
};

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
    ).select(PARTICIPANT_SELECTION);

    if (!updatedParticipant) throw new NotFoundError("Participant not found");

    res.json(updatedParticipant);
  } catch (err) {
    next(err);
  }
};

/**
 * Deletes the logged in participant
 * ! Deleting is dangerous as ecosystems also have the datavalue that can reference a participant
 */
export const deleteParticipant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const deletedParticipant = await Participant.findByIdAndDelete(id);
    if (!deletedParticipant) throw new NotFoundError("Participant not found");
    const ecosystemsToUpdate = await Ecosystem.find({
      hasMemberParticipant: id,
    });

    for (const ecosystem of ecosystemsToUpdate) {
      ecosystem.rolesAndResponsibilities.stakeholders =
        ecosystem.rolesAndResponsibilities.stakeholders.filter(
          (org) => org.organisation.toString() !== id.toString()
        );
      await ecosystem.save();
    }

    await Promise.all([
      ServiceOffering.deleteMany({ offeredBy: id }),
      DataOffering.deleteMany({ offeredBy: id }),
    ]);

    res.json({ message: "Participant deleted successfully" });
  } catch (err) {
    next(err);
  }
};
