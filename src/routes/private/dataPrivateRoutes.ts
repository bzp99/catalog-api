import { Router } from "express";
import { verifyJwtMiddleware } from "../../middleware/auth";
import {
  setJoiValidationSchema,
  validatePayload,
} from "../../middleware/joiValidation";
import {
  createDataOffering,
  deleteDataOfferingById,
  getMyDataOfferings,
  updateDataOfferingById,
} from "../../controllers/private/dataPrivateController";
const r: Router = Router();

r.use(verifyJwtMiddleware);

r.get("/me", getMyDataOfferings);
r.post("/", createDataOffering);
r.put("/:id", setJoiValidationSchema, validatePayload, updateDataOfferingById);
r.delete("/:id", deleteDataOfferingById);

export default r;
