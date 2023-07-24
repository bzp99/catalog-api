import { Router } from "express";
import {
  getAllDataOfferings,
  getDataOfferingById,
} from "../controllers/public/dataPublicController";
import { verifyJwtMiddleware } from "../middleware/auth";
import {
  setJoiValidationSchema,
  validatePayload,
} from "../middleware/joiValidation";
import {
  createDataOffering,
  deleteDataOfferingById,
  getMyDataOfferings,
  updateDataOfferingById,
} from "../controllers/private/dataPrivateController";
const r: Router = Router();

r.get("/", getAllDataOfferings);
r.get("/me", verifyJwtMiddleware, getMyDataOfferings);
r.get("/:id", getDataOfferingById);

r.use(verifyJwtMiddleware);

r.post("/", createDataOffering);
r.put("/:id", setJoiValidationSchema, validatePayload, updateDataOfferingById);
r.delete("/:id", deleteDataOfferingById);

export default r;
