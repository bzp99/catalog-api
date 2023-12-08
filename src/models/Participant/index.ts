import mongoose from "mongoose";
import { IParticipant, IParticipantModel } from "../../types/participant";
import { participantSchema } from "./Participant.model";

export const Participant = mongoose.model<IParticipant, IParticipantModel>(
  "Participant",
  participantSchema
);
