import { Router } from "express";
import {
  createParticipant,
  getAllParticipants,
  getParticipantById,
} from "../../controllers/public/participantsPublicController";
import {
  setJoiValidationSchema,
  validatePayload,
} from "../../middleware/joiValidation";
const r: Router = Router();

r.get("/", getAllParticipants);
r.get("/:id", getParticipantById);
r.post("/", setJoiValidationSchema, validatePayload, createParticipant);

export default r;
