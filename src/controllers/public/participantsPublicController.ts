import { Request, Response, NextFunction } from "express";
import Participant from "../../models/Participant/Participant.model";
import { NotFoundError } from "../../errors/NotFoundError";
import { participantToSelfDescription } from "../../utils/selfDescriptions";

/**
 * Retrieves a participant by id
 */
export const getParticipantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const participantId = req.params.id;
    const participant = await Participant.findById(participantId);

    if (!participant) throw new NotFoundError("Participant not found");
    res.json(participant);
  } catch (err) {
    next(err);
  }
};

/**
 * Creates a new participant
 */
export const createParticipant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const participantData = req.body;
    const newParticipant = new Participant(participantData);

    newParticipant.jsonld = participantToSelfDescription(newParticipant);

    const createdParticipant = await newParticipant.save();

    res.status(201).json(createdParticipant);
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieves Participants. Uses pagination
 */
export const getAllParticipants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = "10", page = "1" } = req.query;

    // TODO Have more query filter options

    const skip = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

    const participants = await Participant.find()
      .skip(skip)
      .limit(parseInt(limit.toString()));

    const totalCount = await Participant.countDocuments();

    const totalPages = Math.ceil(totalCount / parseInt(limit.toString()));

    res.json({ participants, totalCount, totalPages });
  } catch (error) {
    next(error);
  }
};
