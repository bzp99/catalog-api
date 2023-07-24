import { Router } from "express";

import {
  getAllServices,
  getServiceById,
} from "../controllers/public/servicesPublicController";
import { verifyJwtMiddleware } from "../middleware/auth";
import {
  createService,
  deleteServiceById,
  getMyServices,
  updateServiceById,
} from "../controllers/private/servicesPrivateController";
import {
  setJoiValidationSchema,
  validatePayload,
} from "../middleware/joiValidation";
const r: Router = Router();

r.get("/", getAllServices);
r.get("/me", verifyJwtMiddleware, getMyServices);
r.get("/:id", getServiceById);

r.use(verifyJwtMiddleware);

r.post("/", createService);
r.put("/:id", setJoiValidationSchema, validatePayload, updateServiceById);
r.delete("/:id", deleteServiceById);

export default r;
