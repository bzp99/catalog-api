import { Router } from "express";
import {
  createParticipant,
  getAllParticipants,
  getParticipantById,
} from "../controllers/public/participantsPublicController";
import {
  setJoiValidationSchema,
  validatePayload,
} from "../middleware/joiValidation";
import {
  deleteParticipant,
  getMyParticipant,
  updateParticipantById,
} from "../controllers/private/participantsPrivateController";
import { verifyJwtMiddleware } from "../middleware/auth";
const r: Router = Router();

r.get("/", getAllParticipants);
r.get("/me", verifyJwtMiddleware, getMyParticipant);
r.get("/:id", getParticipantById);
r.post("/", setJoiValidationSchema, validatePayload, createParticipant);

r.use(verifyJwtMiddleware);
r.put("/:id", setJoiValidationSchema, validatePayload, updateParticipantById);
r.delete("/me", deleteParticipant);

export default r;
