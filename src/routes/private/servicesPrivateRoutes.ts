import { Router } from "express";
import { verifyJwtMiddleware } from "../../middleware/auth";
import {
  setJoiValidationSchema,
  validatePayload,
} from "../../middleware/joiValidation";

import {
  createService,
  deleteServiceById,
  getMyServices,
  updateServiceById,
} from "../../controllers/private/servicesPrivateController";
const r: Router = Router();

r.use(verifyJwtMiddleware);

r.get("/me", getMyServices);
r.post("/", createService);
r.put("/:id", setJoiValidationSchema, validatePayload, updateServiceById);
r.delete("/:id", deleteServiceById);

export default r;
