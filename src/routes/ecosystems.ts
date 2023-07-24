import { Router } from "express";
import {
  getAllEcosystems,
  getEcosystemById,
} from "../controllers/public/ecosystemsPublicController";
import { verifyJwtMiddleware } from "../middleware/auth";
import { usePopulatedUser } from "../middleware/useAuthenticatedUser";
import { verifyEcosystemOwnership } from "../middleware/ownership";
import {
  setJoiValidationSchema,
  validatePayload,
} from "../middleware/joiValidation";
import {
  createEcosystem,
  deleteEcosystemById,
  getMyEcosystemById,
  getMyEcosystems,
  processAccessRequest,
  updateAccessRequest,
  updateEcosystemById,
} from "../controllers/private/ecosystemsPrivateController";
const r: Router = Router();

r.get("/", getAllEcosystems);
r.get("/me", verifyJwtMiddleware, getMyEcosystems);
r.get("/:id", getEcosystemById);

r.use(verifyJwtMiddleware);

r.get("/me/:id", getMyEcosystemById);
r.put(
  "/:id",
  verifyEcosystemOwnership,
  setJoiValidationSchema,
  validatePayload,
  updateEcosystemById
);
r.delete("/:id", deleteEcosystemById);
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
