import { Router } from "express";
import { verifyJwtMiddleware } from "../../middleware/auth";
import {
  setJoiValidationSchema,
  validatePayload,
} from "../../middleware/joiValidation";
import { updateParticipantById } from "../../controllers/private/participantsPrivateController";
const r: Router = Router();

r.use(verifyJwtMiddleware);

// r.get("/me");
r.put("/:id", setJoiValidationSchema, validatePayload, updateParticipantById);

export default r;
