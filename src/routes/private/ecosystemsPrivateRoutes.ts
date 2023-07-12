import { Router } from "express";
import { verifyJwtMiddleware } from "../../middleware/auth";
import {
  createEcosystem,
  getMyEcosystemById,
  getMyEcosystems,
  updateEcosystemById,
} from "../../controllers/private/ecosystemsPrivateController";
import { verifyEcosystemOwnership } from "../../middleware/ownership";
import {
  setJoiValidationSchema,
  validatePayload,
} from "../../middleware/joiValidation";
const r: Router = Router();

r.use(verifyJwtMiddleware);

r.get("/me", getMyEcosystems);
r.get("/me/:id", getMyEcosystemById);
r.put(
  "/:id",
  verifyEcosystemOwnership,
  setJoiValidationSchema,
  validatePayload,
  updateEcosystemById
);
r.post("/", setJoiValidationSchema, validatePayload, createEcosystem);

export default r;
