import { Router } from "express";
import { verifyJwtMiddleware } from "../../middleware/auth";
import {
  createEcosystem,
  getMyEcosystemById,
  getMyEcosystems,
  processAccessRequest,
  updateAccessRequest,
  updateEcosystemById,
} from "../../controllers/private/ecosystemsPrivateController";
import { verifyEcosystemOwnership } from "../../middleware/ownership";
import {
  setJoiValidationSchema,
  validatePayload,
} from "../../middleware/joiValidation";
import { usePopulatedUser } from "../../middleware/useAuthenticatedUser";
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
r.post(
  "/access-request",
  setJoiValidationSchema,
  validatePayload,
  usePopulatedUser,
  processAccessRequest
);

r.put("/access-request/:id/:action", usePopulatedUser, updateAccessRequest);

export default r;
